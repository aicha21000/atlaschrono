"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const filePath = path.join(process.cwd(), 'cars.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

export async function getCars() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function addCar(formData: FormData) {
  const cars = await getCars();
  
  const savedImages: string[] = [];
  const imageFiles = formData.getAll('images') as File[];
  
  for (const file of imageFiles) {
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const savePath = path.join(uploadsDir, uniqueName);
      
      fs.writeFileSync(savePath, buffer);
      savedImages.push(`/uploads/${uniqueName}`);
    }
  }

  const newCar = {
    id: Date.now().toString(),
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
    status: "Disponible",
    views: 0
  };

  cars.push(newCar);
  fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
  
  revalidatePath('/admin');
  revalidatePath('/cars');
  revalidatePath('/');
  
  return { success: true, carId: newCar.id };
}

export async function incrementCarViews(id: string) {
  try {
    const cars = await getCars();
    const index = cars.findIndex((c: any) => c.id === id);
    if (index !== -1) {
      cars[index].views = (Number(cars[index].views) || 0) + 1;
      fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
      revalidatePath('/admin');
    }
  } catch (error) {
    // Ignore error if file write fails
  }
}

export async function deleteCar(id: string) {
  const cars = await getCars();
  const newCars = cars.filter((c: any) => c.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(newCars, null, 2));
  
  revalidatePath('/admin');
  revalidatePath('/cars');
  revalidatePath('/');
}

export async function updateCarStatus(id: string, newStatus: string) {
  const cars = await getCars();
  const index = cars.findIndex((c: any) => c.id === id);
  if (index !== -1) {
    cars[index].status = newStatus;
    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
    revalidatePath('/admin');
    revalidatePath('/cars');
    revalidatePath('/');
    revalidatePath(`/cars/${id}`);
    return { success: true };
  }
  return { success: false };
}

export async function updateCar(id: string, formData: FormData) {
  const cars = await getCars();
  const index = cars.findIndex((c: any) => c.id === id);
  if (index !== -1) {
    const currentCar = cars[index];
    
    const imageFiles = formData.getAll('images') as File[];
    const newImages: string[] = [];
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const savePath = path.join(uploadsDir, uniqueName);
        fs.writeFileSync(savePath, buffer);
        newImages.push(`/uploads/${uniqueName}`);
      }
    }

    cars[index] = {
      ...currentCar,
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
      images: newImages.length > 0 ? [...currentCar.images, ...newImages] : currentCar.images
    };

    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
    revalidatePath('/admin');
    revalidatePath('/cars');
    revalidatePath('/');
    revalidatePath(`/cars/${id}`);
    return { success: true };
  }
  return { success: false };
}

