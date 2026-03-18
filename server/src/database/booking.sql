-- Booking form schema
-- Purpose: store product booking requests from the Booking page flow.
-- SQL dialect: MySQL 8+

CREATE TABLE IF NOT EXISTS booking_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  booking_reference VARCHAR(30) NOT NULL UNIQUE,
  customer_name VARCHAR(120) NOT NULL,
  customer_phone VARCHAR(30) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  product_category VARCHAR(80) NOT NULL,
  product_name VARCHAR(120) NOT NULL,
  consultant_preference VARCHAR(120) NOT NULL DEFAULT 'Any consultant',
  preferred_date DATE NOT NULL,
  start_time TIME NOT NULL,
  finish_time TIME NOT NULL,
  selected_slot DATETIME NULL,
  payment_method ENUM('pay_on_pickup', 'bank_transfer', 'card_payment') NOT NULL,
  payment_status ENUM('unpaid', 'pending', 'initiated', 'paid', 'failed') NOT NULL DEFAULT 'unpaid',
  payment_reference VARCHAR(120) NULL,
  payment_authorization_url TEXT NULL,
  amount_ngn DECIMAL(10,2) NULL,
  customer_note TEXT,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  completed_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_booking_requests_date_status (preferred_date, status),
  KEY idx_booking_requests_customer_email (customer_email),
  KEY idx_booking_requests_reference (booking_reference)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS booking_status_history (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  booking_id BIGINT UNSIGNED NOT NULL,
  from_status ENUM('pending', 'confirmed', 'completed', 'cancelled') NULL,
  to_status ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL,
  changed_by VARCHAR(120) NULL,
  change_note TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_booking_status_history_booking_id (booking_id),
  CONSTRAINT fk_booking_status_history_booking
    FOREIGN KEY (booking_id) REFERENCES booking_requests(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
