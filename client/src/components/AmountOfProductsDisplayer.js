import React from 'react';
import { Typography } from '@mui/material';

export const AmountOfProductsDisplayer = ({ filteredProducts }) => {
    return (
        <Typography gutterBottom variant="subtitle2">
            Всего {filteredProducts?.length === 1 ? <>найден {filteredProducts?.length} товар</> : 
            <>
                {
                    filteredProducts?.length <= 4 && filteredProducts?.length > 0 ? 
                    <>найдено {filteredProducts?.length} товара</> : 
                    <>найдено {filteredProducts?.length} товаров</>
                }
            </>
            }
        </Typography>
    )
}