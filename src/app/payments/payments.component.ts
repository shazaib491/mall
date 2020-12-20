import { Component, OnInit } from '@angular/core';
import { PaysService } from '../services/pays.service';
import { WindowRefServiceService } from '../services/window-ref-service.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  order_id: any;
  sub_id: any;
  amt: any;
  constructor(
    private pay: PaysService,
    private windowref: WindowRefServiceService
  ) { }
  msg: any;
  params: any
  paramss: any;
  success: any;
  ngOnInit(): void {
  }
  createRzpayOrder() {
    // console.log(data);
    // call api to create order_id
    this.payWithRazor(this.sub_id);
  }
  submit() {
    this.params = {
      amount: this.order_id,
      currency: "INR",
      receipt: "su001",
      payment_capture: '1'
    }
    this.pay.order_id(this.params).subscribe((response) => {
      this.sub_id = response['sub'].id
      this.amt = response['sub'].amount;
    })
  }

  payWithRazor(val) {
    const options: any = {
      key: 'rzp_test_LwbzGwkSx0IhlS',
      amount: this.amt, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'shazaib', // company name or product name
      description: 'for testing',  // product description
      image: 'https://picsum.photos/100', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      this.paramss = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        amount:options.amount,
        currency:options.currency
      }
      this.pay.verify(this.paramss).subscribe((data) => {
        this.success = data;
        if (this.success.status === 'success') {
          alert('your Transcation Successfully done')
        }
      })
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.windowref.nativeWindow.Razorpay(options);
    rzp.open();
  }

}
