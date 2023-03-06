<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name'=>fake()->name(),
            'price'=>fake()->randomNumber(4),
            'quantity'=>fake()->randomNumber(3),
            'amount'=>fake()->randomNumber(5),
        ]);
    }
}
