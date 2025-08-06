/--------------------------------------/

DELIMITER $$

CREATE TRIGGER updating_total_price_INSERT
    AFTER INSERT ON order_items
    FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_price = (
        SELECT SUM(oi.quantity * p.price)
        FROM order_items oi
                 JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = NEW.order_id
    )
    WHERE id = NEW.order_id;
    END$$

    DELIMITER ;


/--------------------------------------/
       DELIMITER $$

    CREATE TRIGGER updating_total_price_UPDATE
        AFTER UPDATE ON order_items OR products
        FOR EACH ROW
    BEGIN
        UPDATE orders
        SET total_price = (
            SELECT SUM(oi.quantity * p.price)
            FROM order_items oi
                     JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = NEW.order_id
        )
        WHERE id = NEW.order_id;
        END$$

        DELIMITER ;

        /--------------------------------------/

    DELIMITER $$

        CREATE TRIGGER updating_priceattime_INSERT
            BEFORE INSERT ON order_items
            FOR EACH ROW
        BEGIN
            SET NEW.price_at_time =  (
        SELECT price
        FROM products
        WHERE id = NEW.product_id
    );
    END$$

            DELIMITER ;
            /--------------------------------------/

            DELIMITER $$

            CREATE TRIGGER updating_priceattime_UPDATE
                BEFORE UPDATE ON order_items
                FOR EACH ROW
            BEGIN
                SET NEW.price_at_time = (
        SELECT price
        FROM products
        WHERE id = NEW.product_id
        );
        END$$

                DELIMITER ;
