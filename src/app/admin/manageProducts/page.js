"use client";

import InputComponent from '@/components/FormElements/InputComponent';
import SelectComponent from '@/components/FormElements/SelectComponent';
import TileComponent from '@/components/FormElements/TileComponent';
import Navbar from '@/components/Navbar';
import Notification from '@/components/Notification';
import { GlobalContext } from '@/context';
import { AvailableSizes, adminAddProductformControls, firebaseConfig, firebaseStroageURL } from '@/utils';
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import {getDownloadURL,getStorage,ref,uploadBytesResumable} from "firebase/storage";
import { addNewProduct } from '@/services/product';
import ComponentLevelLoader from '@/components/Loader/componentlevel';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

const helperForUPloadingImageToFirebase = async (file) => {
  if(file !== ''){
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `ecommercyfy/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch((error) => reject(error));
        }
      );
    })
  }
}

const AddProducts = () => {
  const [formData, setFormData] = useState(initialFormData);
  const {componentLevelLoader,setComponentLevelLoader} = useContext(GlobalContext);

  const handleImage = async (event) => {
    console.log(event.target.files)

    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0]
    );

    console.log(extractImageUrl)

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  }

  const handleTileClick = (getCurrentItem) => {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);
    
    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }
    
    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }

  const handleAddProducts = async () => {
    setComponentLevelLoader({ loading: true, id: "" });
    const response = await addNewProduct(formData)

    console.log(response)

    if (response.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      location.reload()
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
  }

  return (
    <>
    <Navbar/>
      <div className='bg-gray-100'>
        <div className='flex flex-col md:flex-row'>
          <div className="lg:block w-full md:w-1/2 xl:w-3/5">
              <div className="p-5">
                <div className="flex flex-col items-start justify-start md:p-7 xl:p-7 p-5 bg-white rounded-xl relative">
                  <h1 className="text-1xl font-bold leading-tight tracking-tight md:text-1xl">
                      Manage Products
                  </h1>
                  <span className='text-gray-300 text-sm mt-1'>Dashboard / Products / Manage Products</span>

                  <div className='mt-10'>
                    <input accept="image/*" max="1000000" type="file" onChange={handleImage}/>
                  </div>
                  <div className="flex gap-2 flex-col mt-10">
                    <label>Available sizes</label>
                    <TileComponent selected={formData.sizes} onClick={handleTileClick} data={AvailableSizes}/>
                  </div>
                  <div className='w-full grid md:grid-rows-4 md:grid-flow-col gap-4 mt-8'>
                    {adminAddProductformControls.map((controlItem) =>
                      controlItem.componentType === "input" ? (
                        <InputComponent
                          type={controlItem.type}
                          label={controlItem.label}
                          value={formData[controlItem.id]}
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              [controlItem.id]: event.target.value,
                            });
                          }}
                        />
                      ) : controlItem.componentType === "select" ? (
                        <SelectComponent
                          label={controlItem.label}
                          options={controlItem.options}
                          value={formData[controlItem.id]}
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              [controlItem.id]: event.target.value,
                            });
                          }}
                        />
                      ) : null
                    )}
                  </div>
                  <button onClick={handleAddProducts} className="disabled:opacity-50 mt-5 text-white font-medium rounded-lg text-sm px-5 py-3 text-center bg-customButtonColorDark">
                  {
                    componentLevelLoader && componentLevelLoader.loading ? (
                      <ComponentLevelLoader
                        text={'Adding Product'}
                        color={'#fff'}
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                    ) : 
                    'Add Product'
                  }
                  </button>
                </div>
              </div>
          </div>
          <div className="lg:block w-full md:w-1/2 xl:w-2/5">
              <div className="p-5">
                <div className="flex flex-col items-start justify-start md:p-7 xl:p-7 p-5 bg-white rounded-xl relative">
                  <h1 className="text-1xl font-bold leading-tight tracking-tight md:text-1xl">
                      Edit Products
                  </h1>
                  <span className='text-gray-300 text-sm mt-1'>0 Product Records Found</span>
                </div>
              </div>
          </div>
          <Notification/>
        </div>
      </div>
    </>
  )
}

export default AddProducts