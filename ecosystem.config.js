module.exports = {
  apps: [
    {
      name: 'whatsapp-api',
      script: 'dist/main.js',
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
      user: 'seu-usuario',
      host: 'seu-servidor.com',
      ref: 'origin/master',
      repo: 'seu-repositorio.git', // Repositório de onde puxar o código
      path: '/caminho/do/projeto',
      'post-deploy':
        'export PATH=$PATH:/home/seu-usuario/.nvm/versions/node/v20.18.1/bin && yarn install && npx prisma generate && yarn build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
