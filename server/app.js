const express = require('express');
const mongoose = require('mongoose');
const Naruto = require('./models/anime/naruto'); // استيراد النموذج
const Onepiece = require('./models/anime/onepiece'); // استيراد النموذج
const Hxh = require('./models/anime/hxh'); // استيراد النموذج
const kimetsu = require('./models/anime/kimetsu'); // استيراد النموذج

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors()); // تمكين CORS للاتصالات بين المنفذات المختلفة

// Middleware لمعالجة البيانات في صيغة JSON
app.use(express.json());

// الاتصال بقاعدة البيانات
const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://khalilmejri000:ZD6XD4Zz4KMuqnb1@cluster0.28bwdzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

// نقطة النهاية لإضافة عنصر جديد إلى مجموعة naruto
app.post('/api/:category', async (req, res) => {
    const { category } = req.params;
  
    let Model;
    switch (category) {
        case "naruto":
            Model = Naruto;
            break;
        case "onepiece":
            Model = Onepiece;
            break;
        case "hxh":
            Model = Hxh;
            break;
        case "bleach":
            Model = Bleach; // تأكد من أن لديك نموذج Bleach أيضًا
            break;
        case "kimetsu":
            Model = kimetsu;
            break;
        default:
            return res.status(400).send("فئة غير صالحة");
    }

    try {
        const { title, image, price, originalPrice, discount } = req.body;
        const newPost = new Model({ title, image, price, originalPrice, discount });
        
        await newPost.save();
        
        res.status(201).json({ message: 'تمت إضافة العنصر بنجاح', data: newPost });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء إضافة العنصر' });
    }
});

// نقطة جلب موحدة لجميع الفئات مع خاصية التقسيم إلى صفحات
app.get("/api/:category", async (req, res) => {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1; // الصفحة الحالية، افتراضيًا 1
    const limit = parseInt(req.query.limit) || 40; // عدد العناصر في كل صفحة، افتراضيًا 40
    const skip = (page - 1) * limit; // عدد العناصر التي يجب تجاوزها لبدء الصفحة المطلوبة
  
    let Model;
    switch (category) {
        case "naruto":
            Model = Naruto;
            break;
        case "onepiece":
            Model = Onepiece;
            break;
        case "hxh":
            Model = Hxh;
            break;
        case "kimetsu":
            Model = kimetsu;
            break;
        // إضافة فئات أخرى حسب الحاجة
        default:
            return res.status(400).send("فئة غير صالحة");
    }
  
    try {
        const items = await Model.find().skip(skip).limit(limit);
        const totalItems = await Model.countDocuments(); // إجمالي عدد العناصر في المجموعة
        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            items,
            currentPage: page,
            totalPages,
            totalItems,
        });
    } catch (err) {
        console.error(`Error fetching ${category} data:`, err);
        res.status(500).send(`Error fetching ${category} data: ` + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
