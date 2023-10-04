"use client";

import InputComponent from '@/components/FormElements/InputComponent';
import SelectComponent from '@/components/FormElements/SelectComponent';
import TileComponent from '@/components/FormElements/TileComponent';
import Notification from '@/components/Notification';
import ProgressBar from '@/components/ProgressBar';
import FileSelector from '@/components/FileSelector';
import { GlobalContext } from '@/context';
import { AvailableSizes, adminAddProductformControls, firebaseConfig, firebaseStroageURL } from '@/utils';
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addNewProduct, getAllAdminProducts, updateAProduct, deleteAProductImage } from '@/services/product';
import ComponentLevelLoader from '@/components/Loader/componentlevel';
import DataTable from 'react-data-table-component';
import { initializeApp } from "firebase/app";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { helperForUPloadingImageToFirebase } from '@/helpers/helperForUPloadingImageToFirebase';
import InputAreaComponent from '@/components/FormElements/InputAreaComponent';


const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: [],
  priceDrop: 0,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const AddProducts = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [uploading, setUploading] = useState(false);
  const {componentLevelLoader,setComponentLevelLoader,uploadProgress, setUploadProgress,uploadFileName, setuploadFileName} = useContext(GlobalContext);
  const [dataTable, setData] = useState([]);
  const [isActionType, setIsActionType] = useState('');
  

  useEffect(() => {
    getAllProducts();
  }, [])

  const getAllProducts = async () => {
    const getAlladminsProduct = await getAllAdminProducts();

    if(getAlladminsProduct.success){
      setData(getAlladminsProduct.data);
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  const columns = [
		{
			name: 'Image',
			cell: (row) => (
			  <div className="">
					<img src={row.imageUrl} className="w-8 h-auto mt-4 mb-4 rounded"/>
			  </div>
			),
		},,
    { name: 'Name', selector: row => row.name, sortable: true },
		{ name: 'Price', selector: row => row.price, sortable: true },
		{ name: 'On Sale', selector: row => row.onSale, sortable: true },
    {
			name: 'Actions',
			cell: (row) => (
			  <div className="flex">
					<button className="flex items-center mr-2" onClick={() => editData(row.allData)}>
						<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
						</svg>
					</button>
					<button className="flex items-center">
						<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
						</svg>
					</button>
			  </div>
			),
		},
	];

  const mappedData = dataTable.map((row, index) => ({
    imageUrl: row.imageUrl,
    name: row.name,
    price: row.price,
    onSale: row.onSale == 'no' ? 'NO' : 'YES',
    allData: row
	}));

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

  const handleImage = async (event) => {
    const files = event.target.files;
    const imageUrls = [];
    
    if (files.length > 6) {
      toast.error("You can only select a maximum of 6 image files.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      event.target.files = null;
      return;
    } else {
      setUploading(true);

      for (const file of files) {
        const imageUrl = await helperForUPloadingImageToFirebase(file, (progress) => {
          setUploadProgress(progress);
          setuploadFileName(file.name);
        });
        if (imageUrl !== "") {
          imageUrls.push(imageUrl);
        }
      }

      if (imageUrls.length > 0) {
        setFormData({
          ...formData,
          imageUrl: [...formData.imageUrl, ...imageUrls],
        });
      }

      setUploading(false);
      setUploadProgress(0);
    }
  }

  const handleAddProducts = async () => {
    setComponentLevelLoader({ loading: true, id: "" });
    if(isActionType === 'Update') {
      const response = await updateAProduct(formData)

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
    } else {
      const response = await addNewProduct(formData)

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
  }

  const editData = (data) => {
    setFormData(data)
    setIsActionType('Update')
  }

  const handleDeleteImage = (filePath, index) => {
    setComponentLevelLoader({ loading: true, id: "" });
    const storageRef = ref(storage, filePath);

    deleteObject(storageRef)
    .then(async () => {

      const updatedImageUrlArray = [...formData.imageUrl];
      updatedImageUrlArray.splice(index, 1);

      const updatedFormData = { ...formData, imageUrl: updatedImageUrlArray };
      const response = await deleteAProductImage(updatedFormData);

      if (response.success) {
        setComponentLevelLoader({ loading: false, id: "" });
        toast.success(response.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        location.reload()
      } else {
        setComponentLevelLoader({ loading: false, id: "" });
        toast.error(response.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      
    }).catch((error) => {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  }

  return (
    <>
      <div className='h-[350vh] md:h-[150vh] lg:h-[150vh] bg-gray-100'>
        <div className='flex flex-col md:flex-row'>
          <div className="lg:block w-full md:w-1/2 xl:w-3/5">
            <div className="p-2 md:p-5 lg:p-5">
              <div className="flex flex-col items-start justify-start md:p-7 xl:p-7 p-5 bg-white rounded-xl relative">
                <h1 className="text-1xl font-bold leading-tight tracking-tight md:text-1xl">
                    Manage Products
                </h1>
                <span className='text-gray-300 text-sm mt-1'>Dashboard / Products / Manage Products</span>

                <div className="mt-10">
                    <FileSelector
                      acceptType="image/*"
                      maxLimit={1000000}
                      handleImage={handleImage}
                    />
                  </div>
                  
                  <div className="mt-4 flex flex-col md:flex-row gap-4">
                  {formData.imageUrl.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt={`Selected Image ${index + 1}`}
                        className="md:max-w-[80%] lg:max-w-[80%] max-w-[30%] h-auto mt-2 rounded"
                      />
                      <button
                        className="absolute top-0 w-6 bg-red-500 text-white rounded-full"
                        onClick={() => handleDeleteImage(imageUrl, index)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                  </div>
                  <div>
                    {uploading && (
                      <div className='mt-10'><ProgressBar fileName={uploadFileName} progress={uploadProgress} /></div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-col mt-10">
                    <label>Available sizes</label>
                    <TileComponent selected={formData.sizes} onClick={handleTileClick} data={AvailableSizes}/>
                  </div>
                  <div className='w-full grid md:grid-rows-4 md:grid-flow-col gap-4 mt-8'>
                    {adminAddProductformControls.map((controlItem) =>
                      controlItem.componentType === "input" ? (
                        <InputComponent
                          key={controlItem.id}
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
                          key={controlItem.id}
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
                      ) : controlItem.componentType === "inputArea" ? (
                        <InputAreaComponent
                          key={controlItem.id}
                          type={controlItem.type}
                          label={controlItem.label}
                          value={formData[controlItem.id]}
                          row={20}
                          colums={10}
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
                        text={isActionType === 'Update'? 'Updating Product' : 'Adding Product'}
                        color={'#fff'}
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                    ) : 
                    isActionType === 'Update' ? 'Update Product':
                    'Add Product'
                  }
                  </button>
              </div>
            </div>
          </div>
          <div className="lg:block w-full md:w-1/2 xl:w-2/5">
            <div className="p-2 md:p-5 lg:p-5">
              <div className="flex flex-col items-start justify-start md:p-7 xl:p-7 p-5 bg-white rounded-xl relative overflow-x-auto">
                <h1 className="text-1xl font-bold leading-tight tracking-tight md:text-1xl">
                    Edit Products
                </h1>
                <span className='text-gray-300 text-sm mt-1'>{dataTable.length} Product Records Found</span>
                <div className='mt-10'>
                  <DataTable
                    columns={columns}
                    data={mappedData}
                    pagination
                    fixedHeader
                    sortable
                  />
                </div>
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