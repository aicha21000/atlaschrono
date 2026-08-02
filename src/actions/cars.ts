"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const filePath = path.join(process.cwd(), 'cars.json');

export async function getCars() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function addCar(carData: any) {
  const cars = await getCars();
  
  const newCar = {
    id: Date.now().toString(),
    ...carData,
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
