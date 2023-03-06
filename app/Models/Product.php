<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $fillable = [
        'name',
        'price',
        'quantity',
        'amount',
    ];

    public function images(){
        return $this->hasMany(Image::class);
    }
}
