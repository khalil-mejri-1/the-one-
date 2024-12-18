const express = require('express');
const mongoose = require('mongoose');
const Naruto = require('./models/anime/naruto'); // Import the Naruto model
const Onepiece = require('./models/anime/onepiece'); // Import the Onepiece model
const death_note = require('./models/anime/death_note'); // Import the Hxh model
const jujutsu_kaisen = require('./models/anime/jujutsu_kaisen'); // Import the Hxh model

const Hxh = require('./models/anime/hxh'); // Import the Hxh model
const berserk = require('./models/anime/berserk'); // Import the Kimetsu model
const vinland_saga = require('./models/anime/vinland_saga'); // Import the Kimetsu model
const Art_numérique = require('./models/anime/Art numérique'); // Import the Kimetsu model
const van_gogh = require('./models/anime/van gogh'); // Import the Kimetsu model
const attack_on_titan = require('./models/anime/attack on titan'); // Import the Kimetsu model
const monalisa = require('./models/anime/monalisa'); // Import the Kimetsu model
const Fille = require('./models/Fille/Fille'); 
const beststckres = require('./models/best_stickres/beststick'); 


const SpongeBob = require('./models/cartoon/SpongeBob'); // Import the Kimetsu model

const kimetsu = require('./models/anime/kimetsu'); // Import the Kimetsu model
const Detective_Conan = require('./models/anime/Detective_Conan'); // Import the Kimetsu model

const Command = require('./models/command'); // Import the Command model

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const beststick = require('./models/best_stickres/beststick');

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
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




  // إنشاء كائن يحتوي على الفئات والنماذج المرتبطة بها
  const categoryModels = {
    "Naruto": Naruto,
    "One Piece": Onepiece,
    "Hunter X Hunter": Hxh,
    "Death Note": death_note,
    "Kimetsu": kimetsu,
    "Jujutsu Kaisen": jujutsu_kaisen,
    "Detective Conan": Detective_Conan,
    "Berserk": berserk,
    "Vinland Saga": vinland_saga,
    "Art Numérique": Art_numérique,
    "Van Gogh": van_gogh,
    "Attack On Titan": attack_on_titan,
    "Monalisa": monalisa,
    "Fille": Fille,
    "SpongeBob": SpongeBob,
    "beststckres": beststckres
  };
  

// Home route
app.get('/', (req, res) => {
    res.send('Hello orld!');
});

// نقطة نهاية لجلب منتج معين حسب المعرف

app.get('/product/:category', async (req, res) => {
    const { category } = req.params;

    const Model = categoryModels[category];

    if (!Model) {
      return res.status(400).send("فئة غير صالحة");
    }

    try {
      const products = await Model.find();

      if (products.length === 0) {
        return res.status(404).json({ message: 'لا توجد منتجات في هذه الفئة' });
      }

      res.json(products);
    } catch (error) {
      console.error('خطأ في جلب المنتجات:', error);
      res.status(500).json({ message: 'خطأ في الخادم' });
    }
});
  

// إضافة منتج جديد إلى فئة معينة
app.post('/api/:category', async (req, res) => {
    const { category } = req.params;

    const Model = categoryModels[category];

    if (!Model) {
      return res.status(400).send("فئة غير صالحة");
    }

    try {
        const { title, image, price, originalPrice, discount } = req.body;
        const newPost = new Model({ title, image, price, originalPrice, discount });
        await newPost.save();

        res.status(201).json({ message: 'تم إضافة المنتج بنجاح', data: newPost });
    } catch (error) {
        console.error('حدث خطأ أثناء إضافة المنتج:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء إضافة المنتج' });
    }
});



// Get all products
app.get('/beststckres', async (req, res) => {
    try {
        // Get all products with selected fields (title, image, price, etc.)
        const products = await beststick.find({}, 'title image price originalPrice discount'); 
        res.json(products); // Return the data for the products
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error fetching products' });
    }
  });
  






app.post('/commands', async (req, res) => {
    const { nom, tlf, nb, ids } = req.body;

    // التحقق من صحة المدخلات
    if (!nom || !tlf || !nb || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    // التحقق من صحة العناصر في مصفوفة الـ ids
    for (const item of ids) {
        if (!item.id || typeof item.quantity !== 'number' || !item.size) {
            return res.status(400).json({ message: 'Each item must have an id, quantity, and size' });
        }
    }

    try {
        // التأكد من تحويل tlf و nom إلى نوع النص (string) بشكل صحيح
        const normalizedNom = String(nom).trim().toLowerCase();
        const normalizedTlf = String(tlf).trim().toLowerCase();

        // دالة لتوليد رقم عشوائي مكون من 5 أرقام
        const generateRandomNumber = () => Math.floor(10000 + Math.random() * 90000);

        // محاولة توليد رقم عشوائي فريد
        let randomNumber = generateRandomNumber();
        let isUnique = false;

        // التأكد من أن الرقم العشوائي فريد وغير موجود في قاعدة البيانات
        while (!isUnique) {
            const existingCommand = await Command.findOne({ randomNumber });

            if (!existingCommand) {
                isUnique = true;  // الرقم فريد ولا يوجد في قاعدة البيانات
            } else {
                randomNumber = generateRandomNumber(); // إعادة توليد الرقم إذا كان موجودًا
            }
        }

        // إنشاء أمر جديد مع الرقم العشوائي الفريد
        const newCommand = new Command({ nom, tlf, nb, ids, randomNumber });
        await newCommand.save();

        // تحديث قيمة nb في قاعدة البيانات (على سبيل المثال، زيادة nb بمقدار معين أو تغييرها إلى قيمة جديدة)
        const updatedNb = nb + 1; // مثال لتغيير قيمة nb
        newCommand.nb = updatedNb;
        await newCommand.save(); // حفظ التحديث

        // إرسال الاستجابة مع الرقم العشوائي
        res.status(201).json({ message: 'Command added successfully', command: newCommand, randomNumber, nb: updatedNb });

    } catch (error) {
        console.error('Error saving command:', error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
});


// Get all commands (users)
app.get('/api/users', async (req, res) => {
    try {
        // Get all users with selected fields
        const users = await Command.find({}, 'nom tlf ids'); 
        res.json(users); // Return the data for the users
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error fetching users' });
    }
});

// Get command details by ID (name, phone number, and stored ids)
app.get("/command/:nb", async (req, res) => {
    let { nb } = req.params;
    const pageSize = 10;  // تعيين حجم الصفحة (عدد المنتجات لكل طلب)

    // التحقق مما إذا كانت القيمة المدخلة هي رقم
    nb = Number(nb);
    if (isNaN(nb)) {
        return res.status(400).send(`Invalid 'nb' parameter. It should be a number.`);
    }

    try {
        // العثور على الأمر باستخدام الحقل nb
        const commandDetails = await Command.findOne({ nb });

        if (!commandDetails) {
            return res.status(404).send(`Command with nb ${nb} not found`);
        }

        // التحقق من وجود المنتجات في commandDetails
        if (!commandDetails.ids || commandDetails.ids.length === 0) {
            return res.status(404).send(`No products found in command`);
        }

        // استخراج الـ _id من كل عنصر في المصفوفة ids
        const idsArray = commandDetails.ids;

        // دالة للبحث عن المنتج بناءً على الفئة
        const findProductById = async (productId, category) => {
            if (!category) {
                console.error(`Category is missing for product ID: ${productId}`);
                return null;  // إذا كانت القيمة category غير موجودة
            }

            let product;
            try {
                // تحويل category إلى أحرف صغيرة قبل المقارنة
                const normalizedCategory = category.toLowerCase();

                // البحث عن المنتج في القاعدة بناءً على الفئة المحولة
                switch (normalizedCategory) {
                    case 'naruto':
                        product = await Naruto.findOne({ _id: productId });
                        break;
                    case 'onepiece':
                        product = await Onepiece.findOne({ _id: productId });
                        break;
                    case 'hxh':
                        product = await Hxh.findOne({ _id: productId });
                        break;
                    case 'kimetsu':
                        product = await kimetsu.findOne({ _id: productId });
                        break;
                    default:
                        console.error(`Unknown category: ${category} for product ID: ${productId}`);
                        return null;  // إذا كانت الفئة غير معروفة
                }

                return product ? { product, category } : null;
            } catch (err) {
                console.error(`Error finding product with ID: ${productId} in category: ${category}`, err);
                return null;
            }
        };

        // جمع كل المنتجات من المصفوفة
        const allProducts = [];
        let index = 0;  // متغير لتحديد المنتجات التي سيتم إرسالها في كل مرة

        while (index < idsArray.length) {
            // تحديد مجموعة المنتجات الجديدة بناءً على الـ index و pageSize
            const productsToProcess = idsArray.slice(index, index + pageSize);
            const productsWithDetails = [];

            for (let item of productsToProcess) {
                console.log(`Searching for product ID: ${item.id} with category: ${item.category}`); // طباعة المعرف والفئة
                const productData = await findProductById(item.id, item.category);
                if (productData && productData.product) {
                    productsWithDetails.push({
                        _id: item.id,
                        name: productData.product.title,
                        image: productData.product.image,
                        price: productData.product.price,
                        originalPrice: productData.product.originalPrice,
                        discount: productData.product.discount,
                        description: productData.product.description,
                        category: productData.category  // إضافة الفئة إلى التفاصيل
                    });
                }
            }

            // إضافة المنتجات إلى قائمة كاملة
            allProducts.push(...productsWithDetails);

            // تحديث الفهرس للإشارة إلى المنتجات التالية
            index += pageSize;

            // إذا كانت هناك منتجات تم معالجتها، نرسلها مباشرة
            // يمكن تعديل هذه الطريقة لعرض دفعات أكبر أو الانتظار بين الطلبات
        }

        // بعد جمع جميع المنتجات، إرسال الاستجابة كاملة
        res.status(200).json({
            name: commandDetails.nom,
            tlf: commandDetails.tlf,
            products: allProducts
        });

    } catch (err) {
        console.error(`Error fetching command by nb:`, err);
        res.status(500).send(`Error fetching command data: ` + err.message);
    }
});



// نقطة النهاية لحذف منتج بناءً على الفئة والـ id
app.delete('/products/:category/:_id', async (req, res) => {
    const { category, _id } = req.params;

    // الحصول على النموذج بناءً على الفئة
    const Model = categoryModels[category];

    if (!Model) {
      return res.status(400).send("فئة غير صالحة");
    }

    try {
      const deletedProduct = await Model.findByIdAndDelete(_id);

      if (!deletedProduct) {
        return res.status(404).json({ message: 'لم يتم العثور على المنتج' });
      }

      res.status(200).json({ message: 'تم حذف المنتج بنجاح' });
    } catch (error) {
      console.error('حدث خطأ أثناء الحذف:', error);
      res.status(500).json({ message: 'حدث خطأ أثناء الحذف' });
    }
});

// Start server
app.listen(PORT || process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Get item by ID
// app.get("/api/:id", async (req, res) => {
//     const { id } = req.params; // المعرف الذي يتم تمريره من الرابط

//     // محاولة العثور على العنصر باستخدام المعرف فقط
//     try {
//         // البحث في جميع الفئات
//         const item = await Naruto.findById(id) || 
//                      await Onepiece.findById(id) || 
//                      await Hxh.findById(id) || 
//                      await kimetsu.findById(id);

//         if (!item) {
//             return res.status(404).send(`Item with ID ${id} not found`);
//         }

//         res.status(200).json(item); // إرجاع العنصر
//     } catch (err) {
//         console.error(`Error fetching item by ID:`, err);
//         res.status(500).send(`Error fetching item: ` + err.message);
//     }
// });





// Start server