import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp();

//Sendgrid config
import * as sgMail from '@sendgrid/mail';

const API_KEY = "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";
const TEMPLATE_ID = "d-9ac704c414d94d86910af31f3e97c1bb";
sgMail.setApiKey(API_KEY);

var retVal: boolean;

export const genericEmail = functions.https.onCall(async (data, context) => {
    const msg = {
        to: [data.email, 'kiskert.m@gmail.com'],
        from: 'megrendeles@kiskert-m.hu',
        templateId: TEMPLATE_ID,
        dynamic_template_data: {
            subject: data.subject,
            vezetek: data.vezetek,
            kereszt: data.kereszt,
            email: data.email,
            phone: data.phone,
            zip: data.zip,
            city: data.city,
            address: data.address,
            date: data.date,
            items: data.items,
            originalTotal: data.originalTotal,
            discount: data.discount,
            minus: data.minus,
            shippingCost: data.shippingCost,
            subtotal: data.subtotal,
            couponCode: data.couponCode,
            note: data.note
        },
    };

    await sgMail.send(msg).then(() => {
        retVal = true;
    }, error => {
        console.error(error);
        retVal = true;
        if (error.response) {
          console.error(error.response.body)
        }
      });

    return { success: retVal };
});
