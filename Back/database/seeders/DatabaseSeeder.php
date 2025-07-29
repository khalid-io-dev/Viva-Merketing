<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Premier utilisateur avec un nom complet simplifié
        User::factory()->create([
            'firstname' => 'Test',
            'lastname' => 'User',
            'email' => 'test@example.com',
            'phone' => '0000000000',
            'image' => null,
            'password' => Hash::make('password123'),  // mot de passe hashé
        ]);

        // Deuxième utilisateur avec tes données
        User::factory()->create([
            'firstname' => 'Hicham',
            'lastname' => 'Ferhani',
            'email' => 'hicham@example.com',
            'phone' => '0600000000',
            'image' => null,
            'password' => Hash::make('motdepasse123'),  // mot de passe hashé
        ]);

        Order::factory()->count(2)->create();

    }
}
