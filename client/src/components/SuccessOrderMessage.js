import React from 'react';
import { Container, Typography }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const SuccessOrderMessage = ({ handleCloseSuccessModal }) => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <CloseIcon sx={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }} onClick={() => handleCloseSuccessModal()} />
            <Typography variant="h4" gutterBottom textAlign="center">Спасибо!</Typography>
            <div className="svg-container">    
                <svg className="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
                    <circle className="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
                    <path className="tick" fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
                </svg>
            </div>
            <Typography variant="body1" gutterBottom mt="15px" textAlign="justify">Мы приняли ваш заказ и свяжемся с Вами в течение 24 часов по указанному номеру телефона.</Typography>
        </Container>
    )
}