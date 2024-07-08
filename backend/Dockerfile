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

WORKDIR /app


COPY --from=builder /app /app


RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql


RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache


CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000

EXPOSE 8000
