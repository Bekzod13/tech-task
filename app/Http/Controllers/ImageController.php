<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index($id){
        $images = Image::all();
        return response([
            'images'=>$images
        ]);
    }
    public function store(Request $request){


        if($request->hasFile('image')){

            $path = $request->file('image')->store('', 'public', 'images');

            Image::create([
                'product_id'=>$request->product_id,
                'url'=>$path,
            ]);

            return response([
                'message'=>'Successfully'
            ]);
        }else{
            return response([
                'message'=>'Error'
            ]);
        }
    }
}
