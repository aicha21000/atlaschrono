"use server";

import { revalidatePath } from 'next/cache';
import { db, storage } from '@/lib/firebase/config';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function getCars() {
  try {
    const querySnapshot = await getDocs(collection(db, 'cars'));
    const cars: any[] = [];
    querySnapshot.forEach((doc) => {
      cars.push({ id: doc.id, ...doc.data() });
    });
    // Trier par date d'ajout décroissant (id = timestamp)
    return cars.sort((a, b) => Number(b.id) - Number(a.id));
  } catch (error) {
    console.error("Firebase getCars error:", error);
    return [];
  }
}

export async function addCar(formData: FormData) {
  const id = Date.now().toString();
  const savedImages = formData.getAll('imageUrls') as string[];
  const controleTechniquePath = formData.get('controleTechniqueUrl') as string | null;
  
  try {

    const newCar = {
      marque: formData.get('marque'),
      modele: formData.get('modele'),
      annee: Number(formData.get('annee')),
      prix: formData.get('prix'),
      kilometrage: Number(formData.get('kilometrage')),
      energie: formData.get('energie'),
      boite: formData.get('boite'),
      couleur: formData.get('couleur'),
      description: formData.get('description'),
      images: savedImages,
      controleTechnique: controleTechniquePath || null,
      status: "Disponible",
      views: 0
    };

    await setDoc(doc(db, 'cars', id), newCar);

    revalidatePath('/admin');
    revalidatePath('/cars');
    revalidatePath('/');
    
    return { success: true, carId: id };
  } catch (error: any) {
    console.error("Firebase addCar error:", error);
    return { success: false, error: error.message };
  }
}

export async function incrementCarViews(id: string, ip?: string) {
  try {
    const carRef = doc(db, 'cars', id);
    const carSnap = await getDoc(carRef);
    if (carSnap.exists()) {
      const data = carSnap.data();
      const currentViews = data.views || 0;
      let recentVisitors = data.recentVisitors || [];
      
      if (ip) {
        recentVisitors.unshift({ ip, date: new Date().toISOString() });
        // Keep only the last 50 visits
        if (recentVisitors.length > 50) {
          recentVisitors = recentVisitors.slice(0, 50);
        }
      }
      
      await updateDoc(carRef, { 
        views: currentViews + 1,
        recentVisitors
      });
      revalidatePath('/admin');
    }
  } catch (error) {
    // Ignore error
  }
}

export async function deleteCar(id: string) {
  try {
    await deleteDoc(doc(db, 'cars', id));
    revalidatePath('/admin');
    revalidatePath('/cars');
    revalidatePath('/');
  } catch (error) {
    console.error("Firebase deleteCar error:", error);
  }
}

export async function updateCarStatus(id: string, newStatus: string) {
  try {
    const carRef = doc(db, 'cars', id);
    await updateDoc(carRef, { status: newStatus });
    revalidatePath('/admin');
    revalidatePath('/cars');
    revalidatePath('/');
    revalidatePath(`/cars/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Firebase updateCarStatus error:", error);
    return { success: false };
  }
}

export async function updateCar(id: string, formData: FormData) {
  try {
    const carRef = doc(db, 'cars', id);
    const carSnap = await getDoc(carRef);
    
    if (!carSnap.exists()) {
      return { success: false, error: "Véhicule non trouvé" };
    }
    
    const currentCar = carSnap.data();
    
    const newImages = formData.getAll('imageUrls') as string[];
    const ctPath = formData.get('controleTechniqueUrl') as string | null;
    const existingImagesJson = formData.get('existingImages') as string | null;

    let baseImages = currentCar.images || [];
    if (existingImagesJson) {
      baseImages = JSON.parse(existingImagesJson);
    }

    const updatedCar = {
      marque: formData.get('marque') || currentCar.marque,
      modele: formData.get('modele') || currentCar.modele,
      annee: Number(formData.get('annee')) || currentCar.annee,
      prix: formData.get('prix') || currentCar.prix,
      kilometrage: Number(formData.get('kilometrage')) || currentCar.kilometrage,
      energie: formData.get('energie') || currentCar.energie,
      boite: formData.get('boite') || currentCar.boite,
      couleur: formData.get('couleur') || currentCar.couleur,
      description: formData.get('description') || currentCar.description,
      status: formData.get('status') || currentCar.status,
      controleTechnique: ctPath || currentCar.controleTechnique || null,
      images: [...baseImages, ...newImages]
    };

    await updateDoc(carRef, updatedCar);

    revalidatePath('/admin');
    revalidatePath('/cars');
    revalidatePath('/');
    revalidatePath(`/cars/${id}`);
    
    return { success: true };
  } catch (error: any) {
    console.error("Firebase updateCar error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateCarPhotosAndCt(id: string, existingImagesJson: string, ctPath: string | null) {
  try {
    const carRef = doc(db, 'cars', id);
    const carSnap = await getDoc(carRef);
    if (!carSnap.exists()) return { success: false };
    
    const newImages = JSON.parse(existingImagesJson);
    await updateDoc(carRef, { images: newImages, controleTechnique: ctPath });
    
    revalidatePath('/admin');
    revalidatePath('/cars');
    revalidatePath('/');
    revalidatePath(`/cars/${id}`);
    
    return { success: true };
  } catch (error) {
    console.error("Firebase updateCarPhotosAndCt error:", error);
    return { success: false };
  }
}
