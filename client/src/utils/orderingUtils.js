export function orderTextFormation(text) {
    const newLine = '%0A';
    let text = `Информация Клиента:${newLine}
			ФИО: ${form.name ? form.name : 'Клиент не указал информацию' }${newLine}
			Номер телефона: 8${form.telephone.split(/\W/).join('')}${newLine}
			Город: ${form.city ? form.city : 'Клиент не указал информацию'}${newLine}
			Комментарий к заказу: ${form.description ? form.description : 'Клиент не оставил комментарий'}${newLine}${newLine}
			Заказ:${newLine}`;

    for (let key in context.products) {
        const id = key;
        const { name, amount, discountPrice } = context.products[key];

        text += `• ${name.replace('&', '%26')}${newLine}
            Артикул: ${id}${newLine}
            Цена: ${discountPrice}${newLine}
            Количество: ${amount}${newLine}${newLine}`;

    }

    text += `${newLine}Конечная стоимость: ${context.totalPrice}`;
}