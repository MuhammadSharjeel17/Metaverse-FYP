import Data from "./Data";
import Room from "./Room";
import Item from "./Item";
import axios from "axios";

// // let Data = [];
let populatedData;
async function Create() {
  try {
    const Imagedata = await axios.get("http://localhost:8080/api/product/getimageproduct");
    console.log("data", Imagedata.data.data);
    
    Imagedata.data.data.forEach((data,index) => {
        let imgSrc_jpg = "";
        let imgSrc_png = "";
  
        if (data.image.endsWith(".jpg") || data.image.endsWith(".jpeg")) {
          imgSrc_jpg = `http://localhost:8080/ImageUploads/${data.image}`;
        } else if (data.image.endsWith(".png")) {
          imgSrc_png = `http://localhost:8080/ImageUploads/${data.image}`;
        }
      Data.push({
        id:`topcloth_${Data.length +1}`,
        type: data.category === "women" ? "topclothes" : "",
        name:`Top Cloth ${Data.length +1}`,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, nulla.",
        imgSrc_jpg:imgSrc_jpg,
        imgSrc_png: imgSrc_png
      });
    });
    
    console.log("DataDress",Data);
    return Data; // Return the populated Data array
  } catch (error) {
    console.error("Error fetching image data:", error);
    throw error; // Rethrow the error to handle it outside of the function if needed
  }
}

(async () => {
  try {
    populatedData = await Create();
    console.log(populatedData); // Log the populatedData outside of the Create function
    // Use populatedData as needed
  } catch (error) {
    // Handle any errors here
  }
})();
const room = new Room();
console.log(populatedData)
for (let itemData of Data) {
  let { id, type, name, desc, imgSrc_jpg, imgSrc_png } = itemData;
  let item = new Item(id, type, name, desc, imgSrc_jpg, imgSrc_png);
  room.addItem(item);
}

export default room;
