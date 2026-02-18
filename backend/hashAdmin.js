#!/usr/bin/env node

import bcrypt from 'bcrypt';

const password = process.argv[2];

if (!password) {
  console.error('❌ Erreur: Veuillez fournir un mot de passe');
  console.log('Usage: node hashAdmin.js <mot_de_passe>');
  console.log('Exemple: node hashAdmin.js admin123');
  process.exit(1);
}

const saltRounds = 10;

try {
  const hash = await bcrypt.hash(password, saltRounds);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Mot de passe hashé avec succès!');
  console.log('='.repeat(60));
  console.log('\nMot de passe original:', password);
  console.log('\nHash bcrypt:');
  console.log(hash);
  console.log('\n' + '='.repeat(60));
  console.log('\nPour mettre à jour dans la base:');
  console.log(`\nUPDATE admins SET password = '${hash}' WHERE username = 'Fmervil';`);
  console.log('\n' + '='.repeat(60) + '\n');
} catch (error) {
  console.error('❌ Erreur lors du hashage:', error.message);
  process.exit(1);
}
