// index.js
const { execSync } = require('child_process');
const fs = require('fs');

const requiredPackages = [
  'express',
  'dotenv',
  '@supabase/supabase-js',
  'bcrypt',
  'express-session'
];

// Funkcja sprawdzająca czy paczka jest zainstalowana
const checkPackage = (packageName) => {
  try {
    require.resolve(packageName);
    return true;
  } catch (err) {
    return false;
  }
};

// Lista brakujących paczek
const missingPackages = requiredPackages.filter(pkg => !checkPackage(pkg));

if (missingPackages.length > 0) {
  console.log('Brakuje następujących paczek: ', missingPackages.join(', '));
  console.log('Instaluję brakujące paczki...');

  try {
    execSync(`npm install ${missingPackages.join(' ')}`, { stdio: 'inherit' });
    console.log('Wszystkie paczki zostały zainstalowane.');
  } catch (err) {
    console.error('Wystąpił błąd przy instalacji paczek:', err);
    process.exit(1);
  }
}

// Po sprawdzeniu i instalacji - odpalamy aplikację
console.log('Uruchamiam aplikację...');
require('./src/server/server.js');