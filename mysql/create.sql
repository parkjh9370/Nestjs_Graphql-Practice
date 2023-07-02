CREATE TABLE IF NOT EXISTS klook_orders (
  ko_index INT AUTO_INCREMENT NOT NULL COMMENT "관리 번호",
  ko_order_id VARCHAR(255) NOT NULL DEFAULT "" COMMENT "Order Id",
  ko_carmore_order_id VARCHAR(255) NOT NULL DEFAULT "" COMMENT "Carmore Order Id",
  ko_affiliate_id VARCHAR(255) NOT NULL DEFAULT "" COMMENT "Affiliate Unique Id",
  ko_car_id VARCHAR(255) NOT NULL DEFAULT "" COMMENT "Car Unique Id",
  ko_insurance JSON NOT NULL COMMENT "Insurance",
  ko_cancellation_policy JSON NOT NULL COMMENT "Cancellation Policy",
  ko_fuel_policy VARCHAR(20) NOT NULL DEFAULT "" COMMENT "Fuel Policy",
  PRIMARY KEY (ko_index),
  UNIQUE KEY klook_orders_unique_id (ko_order_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT 'klook-api orders';