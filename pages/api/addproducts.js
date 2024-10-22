// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        img: req.body[i].img || null, // Use img if available, otherwise null
        video: req.body[i].video || null, // Use video if available, otherwise null
        category: req.body[i].category,
        price: req.body[i].price,
        availableQty: req.body[i].availableQty,
        size: req.body[i].size,
        color: req.body[i].color,
        sport: req.body[i].sport, // Add the sport field
      });
      await p.save();
    }
    res.status(200).json({ success: "success!" });
  } else {
    res.status(400).json({ error: "error! This method is not allowed." });
  }
  let products = await Product.find();
};
export default connectDb(handler);
    