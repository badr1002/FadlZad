import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  FirebaseStorage
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _http: HttpClient) {

  }

  getAllCategories(): Observable<any> {
    return this._http.get(`/api/category/allcategories`);
  }
  addCategory(data: any): Observable<any> {
    return this._http.post(`/api/category/addCategory`, data);
  }
  getAllProducts(): Observable<any> {
    return this._http.get(`/api/product/allProducts`);
  }
  getAllProductsForAdmin(): Observable<any> {
    return this._http.get(`/api/product/getAllProductsForAdmin`);
  }
  getLast10Products(): Observable<any> {
    return this._http.get(`/api/product/allProducts?limit=10`);
  }
  getProductById(id: any): Observable<any> {
    return this._http.get(`/api/product/getProductById/${id}`);
  }
  getAllProductByUserId(): Observable<any> {
    return this._http.get(`/api/product/getAllProductByUserId`);
  }
  searchProductByName(search_term: any): Observable<any> {
    return this._http.get(`/api/product/searchProductByName/${search_term}`);
  }
  editProduct(data: any): Observable<any> {
    return this._http.patch(`/api/product/editProduct`, data);
  }
  enableProduct(id: any): Observable<any> {
    return this._http.patch(`/api/product/enableProduct`, { id });
  }
  disableProduct(id: any): Observable<any> {
    return this._http.patch(`/api/product/disableProduct`, { id });
  }
  addProduct(data: any): Observable<any> {
    return this._http.post(`/api/product/addProduct`, data);
  }
  deleteProduct(id: any): Observable<any> {
    return this._http.delete(`/api/product/deleteProduct/${id}`,);
  }
  uploadProductImages(data: any, productId: any): Observable<any> {
    return this._http.post(`/api/product/productImages/${productId}`, data);
  }

  uploadProductImagesCloud = async (file: File, productId: any, i: any, callback: any) => {
    try {
      const metadata = {
        contentType: 'image/jpeg',
        size: 2097152,
      };
      let user: any = JSON.parse(localStorage.getItem('user'))
      let ext = file.name.split(/[#?]/)[0].split('.').pop().trim()
      const filePath = `/products/${user._id + '_' + productId + '_' + i + '.' + ext}`;
      const storage = getStorage();
      const storageRef = ref(storage, filePath);
      const uploadTask = await uploadBytesResumable(storageRef, file, metadata)
      getDownloadURL(uploadTask.ref).then((downloadURL) => {
        callback(false, downloadURL)
      }).catch(err => {
        callback(true, err)
      })
    } catch (err) {
      callback(true, err)
    }
  }

  deleteProductImageCloud = (productId:any,imageLink:any,i:any,callback: any) => {

    let user: any = JSON.parse(localStorage.getItem('user'))
    let ext = imageLink.split(/[#?]/)[0].split('.').pop().trim()
    const filePath = `/products/${user._id + '_' + productId + '_' + i + '.' + ext}`;
    const storage = getStorage();
    const desertRef = ref(storage, filePath);
    deleteObject(desertRef).then(() => {
      callback(false)
    }).catch(err => {
      callback(true, err)
    })


  }
}
