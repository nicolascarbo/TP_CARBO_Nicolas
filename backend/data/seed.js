import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/userModel.js';

const seedData = async () => {
  try {
    await connectDB();

    const count = await User.countDocuments();

    if (count === 0) {
      await User.insertMany([
        {
          name: 'Alice Martin',
          email: 'alice@example.com',
          role: 'admin'
        },
        {
          name: 'Bob Dupont',
          email: 'bob@example.com',
          role: 'user'
        },
        {
          name: 'Charlie Durand',
          email: 'charlie@example.com',
          role: 'user'
        }
      ]);
      console.log('3 utilisateurs insérés avec succès !');
    } else {
      console.log('La collection contient déjà des utilisateurs. Aucune insertion effectuée.');
    }
  } catch (error) {
    console.error(`Erreur lors du seeding: ${error.message}`);
  } finally {
    await mongoose.connection.close();
    console.log('Connexion MongoDB fermée correctement.');
    process.exit(0);
  }
};
//tu en es a la partie 3, la partie 2 ok
seedData();
