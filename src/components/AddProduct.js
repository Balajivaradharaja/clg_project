// import React, { useState } from 'react';
// import axios from 'axios';

// const AddProduct = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5001/api/products', {
//         name,
//         price,
//         quantity,
//       });
//       setMessage(`✅ Product added: ${res.data.name}`);
//       setName('');
//       setPrice('');
//       setQuantity('');
//     } catch (err) {
//       setMessage(`❌ Error: ${err.response?.data?.error || 'Server error'}`);
//     }
//   };

//   return (
//     <div className="add-product-container">
//       <h2>Add New Product</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//         />
//         <button type="submit">Add Product</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AddProduct;


// import React, { useState } from 'react';
// import axios from 'axios';

// const AddProduct = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [message, setMessage] = useState('');

//   const handleAddProduct = async () => {
//     if (!name || !price || !quantity) {
//       setMessage('❌ Please fill all fields');
//       speak('Please fill all fields');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5001/api/products', {
//         name,
//         price: Number(price),
//         quantity: Number(quantity),
//       });
//       setMessage(`✅ Product "${name}" added successfully!`);
//       speak(`Product ${name} added successfully`);
//       setName('');
//       setPrice('');
//       setQuantity('');
//     } catch (error) {
//       setMessage('❌ Error adding product');
//       speak('Error adding product');
//     }
//   };

//   const speak = (text) => {
//     const synth = window.speechSynthesis;
//     const utter = new SpeechSynthesisUtterance(text);
//     synth.speak(utter);
//   };

//   return (
//     <div>
//       <h2>Add New Product</h2>
//       <input
//         placeholder="Product Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         placeholder="Price"
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       <input
//         placeholder="Quantity"
//         type="number"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//       />
//       <button onClick={handleAddProduct}>Add Product</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default AddProduct;




import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [expiry, setExpiry] = useState('');
  const [message, setMessage] = useState('');

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // const formattedExpiry = new Date(expiry).toISOString(); // ← format it here
  
      await axios.post('http://localhost:5001/api/products', {
        name,
        stock: Number(stock),
        expiry: new Date(expiry).toISOString(),
      });
  
      setMessage(`✅ Product "${name}" added successfully!`);
      speak(`Product ${name} added successfully`);
  
      setName('');
      setStock('');
      setExpiry('');
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage('❌ Error adding product');
      speak('Error adding product');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Product</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="date"
          placeholder="Expiry Date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          ➕ Add Product
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export default AddProduct;


// import React, { useState } from 'react';

// // Voice Control setup
// const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new speechRecognition();
// recognition.continuous = true;
// recognition.lang = 'en-US';
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;

// const AddProduct = () => {
//   const [name, setName] = useState('');
//   const [stock, setStock] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [message, setMessage] = useState('');
//   const [isListening, setIsListening] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Get the current products from localStorage or initialize an empty array
//     const currentProducts = JSON.parse(localStorage.getItem('products')) || [];

//     // Create a new product
//     const newProduct = {
//       _id: Date.now().toString(),
//       name,
//       stock: Number(stock),
//       expiry: new Date(expiry),
//     };

//     // Add the new product to the list
//     currentProducts.push(newProduct);

//     // Store the updated list of products in localStorage
//     localStorage.setItem('products', JSON.stringify(currentProducts));

//     setMessage(`✅ Product "${name}" added successfully!`);

//     // Clear the form
//     setName('');
//     setStock('');
//     setExpiry('');
//   };

//   const startListening = () => {
//     recognition.start();
//     setIsListening(true);

//     recognition.onresult = (event) => {
//       const lastResult = event.results[event.results.length - 1];
//       const transcript = lastResult[0].transcript.toLowerCase();

//       if (transcript.includes('name')) {
//         setName(transcript.replace('name', '').trim());
//       } else if (transcript.includes('stock')) {
//         setStock(transcript.replace('stock', '').trim());
//       } else if (transcript.includes('expiry')) {
//         setExpiry(transcript.replace('expiry', '').trim());
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//     };
//   };

//   const stopListening = () => {
//     recognition.stop();
//     setIsListening(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Add New Product</h2>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Stock"
//           value={stock}
//           onChange={(e) => setStock(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <input
//           type="date"
//           placeholder="Expiry Date"
//           value={expiry}
//           onChange={(e) => setExpiry(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <button type="submit" style={styles.button}>
//           ➕ Add Product
//         </button>
//       </form>

//       {message && <p style={styles.message}>{message}</p>}

//       <div style={styles.voiceControlContainer}>
//         <button
//           onClick={isListening ? stopListening : startListening}
//           style={styles.voiceControlButton}
//         >
//           {isListening ? 'Stop Listening' : 'Start Listening'}
//         </button>
//         <p style={styles.voiceStatus}>
//           {isListening ? 'Listening for commands...' : 'Click to start voice input'}
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: '40px auto',
//     padding: '20px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     fontFamily: 'Arial, sans-serif',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '6px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     padding: '12px',
//     fontSize: '16px',
//     borderRadius: '6px',
//     border: 'none',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     cursor: 'pointer',
//   },
//   message: {
//     marginTop: '20px',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   voiceControlContainer: {
//     marginTop: '20px',
//     textAlign: 'center',
//   },
//   voiceControlButton: {
//     padding: '10px 15px',
//     fontSize: '16px',
//     borderRadius: '6px',
//     backgroundColor: '#FF6347',
//     color: 'white',
//     cursor: 'pointer',
//   },
//   voiceStatus: {
//     marginTop: '10px',
//     fontSize: '14px',
//     color: '#555',
//   },
// };

// export default AddProduct;



// import React, { useState } from 'react';

// const AddProduct = () => {
//   const [name, setName] = useState('');
//   const [stock, setStock] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [message, setMessage] = useState('');
//   const [isListening, setIsListening] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create new product object
//     const newProduct = {
//       _id: Date.now().toString(),
//       name,
//       stock: Number(stock),
//       expiry: new Date(expiry),
//     };

//     // Fetch the current product list from localStorage
//     const currentProducts = JSON.parse(localStorage.getItem('products')) || [];

//     // Add the new product to the list
//     currentProducts.push(newProduct);

//     // Store the updated product list back into localStorage
//     localStorage.setItem('products', JSON.stringify(currentProducts));

//     // Show confirmation message
//     setMessage(`✅ Product "${name}" added successfully!`);

//     // Clear the form fields
//     setName('');
//     setStock('');
//     setExpiry('');
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Add New Product</h2>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Stock"
//           value={stock}
//           onChange={(e) => setStock(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <input
//           type="date"
//           placeholder="Expiry Date"
//           value={expiry}
//           onChange={(e) => setExpiry(e.target.value)}
//           style={styles.input}
//           required
//         />

//         <button type="submit" style={styles.button}>
//           ➕ Add Product
//         </button>
//       </form>

//       {message && <p style={styles.message}>{message}</p>}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: '40px auto',
//     padding: '20px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     fontFamily: 'Arial, sans-serif',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '6px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     padding: '12px',
//     fontSize: '16px',
//     borderRadius: '6px',
//     border: 'none',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     cursor: 'pointer',
//   },
//   message: {
//     marginTop: '20px',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// };

// export default AddProduct;
