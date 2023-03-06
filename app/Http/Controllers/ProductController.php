<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return response([
            'products'=> ProductResource::collection($products),
        ]);
    }
    public function store(Request $request){
        Product::create([
            'name'=>$request->name,
            'price'=>$request->price,
            'quantity'=>$request->quantity,
            'amount'=>$request->amount,
        ]);
        return response([
            'message'=>'Successfully'
        ]);
    }
    public function update(Request $request, $id){
        Product::find($id)->update([
            'name'=>$request->name,
            'price'=>$request->price,
            'quantity'=>$request->quantity,
            'amount'=>$request->amount,
        ]);
        return response([
            'message'=>'Successfully'
        ]);
    }
    public function show($id){
        return response([
            'product' => new ProductResource(Product::find($id))
        ]);
    }
    public function destroy(Request $request){
       Product::find($request->id)->delete();
       Image::where("product_id", $request->id)->delete();
       return response([
        'message'=>'Successfully'
    ]);
    }
}
