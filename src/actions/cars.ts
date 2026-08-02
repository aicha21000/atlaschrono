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
    status: "En ligne"
  };

  cars.push(newCar);
  fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
  
  revalidatePath('/admin');
  revalidatePath('/cars');
  revalidatePath('/');
  
  return { success: true, carId: newCar.id };
}

export async function deleteCar(id: string) {
  const cars = await getCars();
  const newCars = cars.filter((c: any) => c.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(newCars, null, 2));
  
  revalidatePath('/admin');
  revalidatePath('/cars');
  revalidatePath('/');
}
