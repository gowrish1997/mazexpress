function user_registerBodyContet() {
    return [
        "We’re excited to welcome you to Untitled and we’re even more excited about what we’ve got planned. You’re already on your way get your products delivered.",
        "Untitled and we’re even more excited about what we’ve got planned. You’re already on your way get your products delivered.",
    ];
}
function admin_registerBodyContent() {
    return [
        "New user has registered on Maz Express. We are pleased to welcome this user to our platform and hope to provide them with the best services possible.",
        "The user's information is as follows:",
    ];
}

function user_forgotPasswordContent() {
    return [
        "We have received your request for a password reset for your Maz Express account. We understand how important it is for you to access your account, and we are here to help you with that.",
        "To reset your password Click reset password",
    ];
}
function user_passwordChangedContent() {
    return [
        "This is to inform you that your Maz Express account password has been successfully changed. Please note that if you did not initiate this change or suspect any unauthorized activity on your account, please contact us immediately.",
    ];
}
function user_orderPlaced(order_id: string) {
    return [
        `Hi Angela! Thanks for ordering with us. We’ve received your order with reference id ${order_id} We will notify you when arrived at warehouse .`,
    ];
}

//  function admin_orderPlaced(order_id:string,product:string,quantity:string,amount:string,warehouse:string) {
//     return ["New order has been placed by a user and needs to be shipped to the warehouse address. ","he details of the order are as follows:",`Order Number:${order_id} Product Name: ${product} Quantity: ${quantity} Total Amount: ${amount}`,`The user has requested that the order be shipped to the following warehouse address:`,`${warehouse}`,`Please ensure that the order is shipped to the correct address and that it arrives safely and on time. If you have any questions or concerns regarding this order, please do not hesitate to contact user.`];
// }
function admin_orderPlaced(
    product: string,
    store: string,
    quantity: string,
    warehouse: string
) {
    return [
        "New order has been placed by a user and needs to be shipped to the warehouse address. ",
        "he details of the order are as follows:",
        ` order reference ID: ${product} store link:${store} Quantity: ${quantity} `,
        `The user has requested that the order be shipped to the following warehouse address:`,
        `${warehouse}`,
        `Please ensure that the order is shipped to the correct address and that it arrives safely and on time. If you have any questions or concerns regarding this order, please do not hesitate to contact user.`,
    ];
}

function user_orderDispatched(order_id: string, maz_id: string) {
    return [
        `Thanks for ordering with us. We're happy to inform you that your order No. ${order_id} has been dispatched from our warehouse. You can track your order using the Maz ID provided below:`,
        `Maz ID: ${maz_id}`,
    ];
}

function user_orderDelivered(order_id: string) {
    return [
        `Thank you for ordering with us. We are happy to inform you that your order No. ${order_id} has been delivered to you successfully. If you have any queries or concerns regarding your order, please feel free to contact us. We are always here to assist you.`,
    ];
}
function user_enquiry_reply(content: string) {
    return [
        `Thank you for enquiry with us. we tried out best to answer your query, please feel free to contact us. We are always here to assist you.`,
        `Answer for you enquiry: ${content}`,
    ];
}
function user_enquiry(content: string) {
    return [`You got new enquiry from user`, `User enquiry:${content} `];
}
function user_bill_update(content: string) {
    return [`Bill has been updated for your order with maz_ID ${content}`];
}

export {
    user_registerBodyContet,
    admin_registerBodyContent,
    user_orderPlaced,
    admin_orderPlaced,
    user_orderDispatched,
    user_orderDelivered,
    user_forgotPasswordContent,
    user_passwordChangedContent,
    user_enquiry_reply,
    user_enquiry,
    user_bill_update,
};
