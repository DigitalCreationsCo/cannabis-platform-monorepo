describe('Env ', () => {
  it(' check valid env vars', () => {
    expect(process.env.NEXT_PUBLIC_SHOP_APP_URL).toBeDefined();
    expect(process.env.NEXT_PUBLIC_SHOP_APP_NAME).toBeDefined();
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     expect('1').toBe('1');
    //     NEXT_PUBLIC_APP_URL: (() => {
    //         if (isDev) return 'http://localhost:3000';
    //         if (isProd) return 'https://localhost:3000';
    //         if (isStaging) return 'https://localhost:3000';
    //         return 'NEXT_PUBLIC_APP_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     NEXT_PUBLIC_SHOP_APP_URL: (() => {
    //         if (isDev) return 'http://localhost:3000';
    //         if (isProd) return 'https://localhost:3000';
    //         if (isStaging) return 'https://localhost:3000';
    //         return 'NEXT_PUBLIC_SHOP_APP_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     NEXT_PUBLIC_DASHBOARD_APP_URL: (() => {
    //         if (isDev) return 'http://localhost:3001';
    //         if (isProd) {
    //             return 'http://localhost:3001';
    //         }
    //         if (isStaging) return 'http://localhost:3001';
    //         return 'NEXT_PUBLIC_DASHBOARD_APP_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SERVER_MAIN_URL: (() => {
    //         if (isDev) return 'http://localhost:6001';
    //         if (isProd) {
    //             return 'http://localhost:6001';
    //         }
    //         if (isStaging) return 'http://localhost:6001';
    //         return 'SERVER_MAIN_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SERVER_LOCATION_URL: (() => {
    //         if (isDev) return 'http://localhost:6011';
    //         if (isProd) {
    //             return 'http://localhost:6011';
    //         }
    //         if (isStaging) return 'http://localhost:6011';
    //         return 'SERVER_LOCATION_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SERVER_PAYMENTS_URL: (() => {
    //         if (isDev) return 'http://localhost:6021';
    //         if (isProd) {
    //             return 'http://localhost:6021';
    //         }
    //         if (isStaging) return 'http://localhost:6021';
    //         return 'SERVER_PAYMENTS_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SERVER_IMAGE_URL: (() => {
    //         if (isDev) return 'http://localhost:6031';
    //         if (isProd) {
    //             return 'http://localhost:6031';
    //         }
    //         if (isStaging) return 'http://localhost:6031';
    //         return 'SERVER_IMAGE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SUPERTOKENS_CONNECTION_URI: (() => {
    //         if (isDev) return 'http://localhost:3567';
    //         if (isProd) {
    //             return 'http://localhost:3567';
    //         }
    //         if (isStaging) return 'http://localhost:3567';
    //         return 'SUPERTOKENS_CONNECTION_URI:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     DATABASE_URL: (() => {
    //         if (isDev)
    //             return 'postgresql://postgres:RRJV@y_CK-jz9rj@db.runhqicnmxfwlzwllswi.supabase.co:5432/postgres';
    //         if (isProd)
    //             return 'postgresql://postgres:TdRI1pIMnTkBHKRq@db.apcnayhzxaforyeoqdjq.supabase.co:5432/postgres';
    //         if (isStaging)
    //             return 'postgresql://postgres:RRJV@y_CK-jz9rj@db.runhqicnmxfwlzwllswi.supabase.co:5432/postgres';
    //         return 'DATABASE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     SHADOW_DATABASE_URL: (() => {
    //         if (isDev) return 'mysql://root:secret@localhost:6603/shadowdb';
    //         if (isProd)
    //             return 'mysql://shadow-db-1:4eyKYN+C#?&n3%R@139-144-253-195.ip.linodeusercontent.com:3306/shadow_db';
    //         if (isStaging) return 'mysql://root:secret@localhost:6603/shadowdb';
    //         return 'SHADOW_DATABASE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     LOCATION_IQ_GEOCODE_URL: (() => {
    //         if (isDev) return 'https://us1.locationiq.com/v1/search';
    //         if (isStaging) return 'https://us1.locationiq.com/v1/search';
    //         if (isProd) return 'https://us1.locationiq.com/v1/search';
    //     })(),
    //     LOCATION_IQ_REVERSE_GEOCODE_URL: (() => {
    //         if (isDev) return 'https://us1.locationiq.com/v1/reverse';
    //         if (isStaging) return 'https://us1.locationiq.com/v1/reverse';
    //         if (isProd) return 'https://us1.locationiq.com/v1/reverse';
    //     })()
    // };

    // const env_2 = {
    //     SUPERTOKENS_DASHBOARD_KEY: (() => {
    //         if (isDev) return 'l87ZtvrDXHQZdqalA=M8j7r5=JmLDx';
    //         if (isProd) {
    //             return 'l87ZtvrDXHQZdqalA=M8j7r5=JmLDx';
    //         }
    //         if (isStaging) return 'l87ZtvrDXHQZdqalA=M8j7r5=JmLDx';
    //         return 'SUPERTOKENS_DASHBOARD_KEY:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })(),
    //     LOCATION_IQ_API_KEY: (() => {
    //         if (isDev) return 'pk.278b66a869a9b35b4ffd5c90d5f58278';
    //         if (isProd) {
    //             return 'pk.278b66a869a9b35b4ffd5c90d5f58278';
    //         }
    //         if (isStaging) return 'pk.278b66a869a9b35b4ffd5c90d5f58278';
    //         return 'LOCATION_IQ_API_KEY:not (isDev,isProd && !isStaging,isProd && isStaging)';
    //     })()
    // };

    //     NEXT_PUBLIC_SHOP_APP_NAME: (() => {
    //         return 'Gras Cannabis Marketplace';
    //     })(),
    //     NEXT_PUBLIC_DASHBOARD_APP_NAME: (() => {
    //         return 'Gras Cannabis Marketplace';
    //     })(),
    //     GEO_DB_NS: (() => {
    //         return 'Gras_geoDB';
    //     })(),
    //     PASSWORD_RESET_EXPIRY_MINS: (() => {
    //         return 15;
    //     })(),
    //     PASSWORD_SALT_ROUNDS: (() => {
    //         return 12;
    //     })()
  });
});
