module.exports = {
  apps: [
    {
      name: 'whatsapp-api',
      script: 'dist/src/main.js',
      instances: 1, // Ou "max" para usar múltiplos núcleos
      autorestart: true,
      watch: false, // Habilite se quiser que o PM2 monitore mudanças no código
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'jarbas',
      host: 'smartmonitor.ifce.edu.br',
      ref: 'origin/main',
      repo: 'douglasnobree/whatsapp-api-1.git', // Repositório de onde puxar o código
      path: '/home/jarbas/iot-whatsapp',
      'post-deploy':
        'export PATH=$PATH:/home/jarbas/.nvm/versions/node/v20.18.1/bin && yarn install && npx prisma db push && npx prisma generate && yarn build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
