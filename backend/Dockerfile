FROM php:8.2-fpm AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

COPY . /app

RUN composer install --no-dev --optimize-autoloader

FROM php:8.2-fpm

WORKDIR /var/www/html

COPY --from=builder /app /var/www/html

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

CMD php artisan migrate --force && php-fpm

EXPOSE 9000
