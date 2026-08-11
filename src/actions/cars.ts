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
  const savedImages: string[] = [];
  const imageFiles = formData.getAll('images') as File[];
  
  try {
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `cars/${id}/${Date.now()}-${safeName}`;
        
        const storageRef = ref(storage, uniqueName);
        await uploadBytes(storageRef, bytes, { contentType: file.type || 'image/jpeg' });
        const url = await getDownloadURL(storageRef);
        savedImages.push(url);
      }
    }

    let controleTechniquePath: string | undefined = undefined;
    const ctFile = formData.get('controleTechnique') as File | null;
    if (ctFile && ctFile.size > 0) {
      const bytes = await ctFile.arrayBuffer();
      const safeName = ctFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueName = `cars/${id}/CT-${Date.now()}-${safeName}`;
      
      const storageRef = ref(storage, uniqueName);
      await uploadBytes(storageRef, bytes, { contentType: ctFile.type || 'application/pdf' });
      controleTechniquePath = await getDownloadURL(storageRef);
    }

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

export async function incrementCarViews(id: string) {
  try {
    const carRef = doc(db, 'cars', id);
    const carSnap = await getDoc(carRef);
    if (carSnap.exists()) {
      const currentViews = carSnap.data().views || 0;
      await updateDoc(carRef, { views: currentViews + 1 });
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
    
    const imageFiles = formData.getAll('images') as File[];
    const newImages: string[] = [];
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `cars/${id}/${Date.now()}-${safeName}`;
        
        const storageRef = ref(storage, uniqueName);
        await uploadBytes(storageRef, bytes, { contentType: file.type || 'image/jpeg' });
        const url = await getDownloadURL(storageRef);
        newImages.push(url);
      }
    }

    let ctPath = currentCar.controleTechnique;
    const ctFile = formData.get('controleTechnique') as File | null;
    if (ctFile && ctFile.size > 0) {
      const bytes = await ctFile.arrayBuffer();
      const safeName = ctFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueName = `cars/${id}/CT-${Date.now()}-${safeName}`;
      
      const storageRef = ref(storage, uniqueName);
      await uploadBytes(storageRef, bytes, { contentType: ctFile.type || 'application/pdf' });
      ctPath = await getDownloadURL(storageRef);
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
      controleTechnique: ctPath || null,
      images: newImages.length > 0 ? [...(currentCar.images || []), ...newImages] : currentCar.images
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
