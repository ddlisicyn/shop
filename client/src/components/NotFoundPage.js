import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import error_image from '../media/images/problem.png';

export const NotFoundPage = () => {
    return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h5">
            К сожалению, мы не можем найти страницу, которую вы ищете.
            <br/>
            Код ошибки: 404
        </Typography>
        <img style={{ width: '100%', maxWidth: '512px' }} alt="404 HTTP ERROR" src={error_image} />
        <a style={{ fontSize: '0px' }} href="https://www.flaticon.com/free-icons/question" title="question icons">Question icons created by ultimatearm - Flaticon</a>
        <Box>
            <Typography>Возможные причины:</Typography>
            <ol style={{ margin: 0, paddingLeft: '1rem' }}>
                <li>Возможно, вы ошиблись в ссылке.</li>
                <li>Страница, которую вы ищете, больше не существует.</li>
                <li>Вы пытаетесь просмотреть страницу, которая требует соответствующих прав пользователя.</li>
            </ol>
            <Typography>Вернитесь на <Link href="/" underline="none">домашнюю страницу </Link> 
            или попробуйте нашу панель поиска в верхней части страницы.
            </Typography>
        </Box>
    </Box>
    )
}