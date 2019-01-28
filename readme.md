# Paystack-cli # 
> Paystack command line

A simple CLI tool that makes [Paystack](https://paystack.com/ " Paystack") easier for developers to intergrate. It outputs a file that interacts with Paystack APIs as well as its minified version if requested.

## Install

```
npm i paystack-cli -g
```
## Usage

```
paystack-cli --help
```
The above command will display the neccesary infomation and its usage

### Important Flags 
` -h ` or ` --help ` shows the usage

` -v ` or ` --version ` shows the version

### Important Command

`c` or `create` with necessary arguments will ask for Paystack Public Key and then create the necessary file as well as its minified version if optional `min` argument is provided.

### Important Arguments

`inline` to output the paystack-inline.js file which contains necessary codes for [Paystack Inline](https://developers.paystack.co/docs/paystack-inline "Paystack Inline")

`embed` to output the paystack-embed.js file which contains necessary codes for [Paystack Inline Embed](https://developers.paystack.co/docs/paystack-embded "Paystack Inline Embed")

`paystack-js` to output the paystack.js file which contains necessary codes for [Paystack Js](https://developers.paystack.co/docs/paystack-js "Paystack Js")

```
paystack-cli c inline
```
will output the inline file 
```
paystack-cli create embed
```
will output embed file

### Optional Arguments

`min` to minify any of the produced outputs 

```
paystack-cli create embed min
```
## File Usage and JQuery IDs
> Please make sure to use the following JQuery IDs in order to interact with the outputed file.

### Inline

> for those that want to use paystack as inline. Paystack UI will pop up as a modal

```html
<!-- import necessary scripts here -->
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="https://js.paystack.co/v1/inline.js"></script>
<script src="js/paystack-inline.js"></script>

<!-- The following IDs must be included in 
your html file (Note that they can be anywhere 
according to your choice.) -->
<form >
    <input id="customer-email" placeholder="Customer Email" />
    <input id="amount" placeholder="Amount" />
    <input id="mobile-number" placeholder="Mobile Number" />
    <button type="button" onclick="payWithPaystack()">Pay</button> 
</form>
<p id="success-response"></p>
```

### Inline Embed
>for those want to use paystack as embeded frame. Paystack UI will be loaded in a container on your page
```html
<!-- import necessary scripts here -->
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="https://js.paystack.co/v1/inline.js"></script>

<!-- include this line to initialize Paystack -->
<div id="paystackEmbedContainer"></div>

<!-- The following IDs and onclick attribute must be 
included in your html file (Note that they can be anywhere 
according to your choice.) -->

<form>
    <input id="customer-email" placeholder="Customer Email" />
    <input id="amount" placeholder="Amount" />
    <button type="button" onclick="pay()">Pay</button>
</form>
<p id="success-response"></p>

<!-- Please include this at the bottom of the html file -->
<script src="js/paystack-embed.js"></script>
```
### Paystack-js
>for those that want to write custom code with Paystack. Payment will have to be initialized first from the server and access code will be used. You can check [Initailize Page](https://developers.paystack.co/reference#initialize-a-transaction) to get the grasp of how it is done.
```html
<!-- import necessary scripts here -->
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="https://js.paystack.co/v1/paystack.js"></script>
<script src="js/paystack.js"></script>

<!-- You will have to initialize the transaction before anything. 
    After initialization, Paystack API will respond with an 
    access-code which must be passed to #access_code as a text -->
    
<!-- You can either visit 
    https://developers.paystack.co/reference#initialize-a-transaction
    to get a grasp of how this can be done with cURL and you can as well 
    do this in any server-side language of your choice-->

<!-- The following data-paystack must be 
included in your html file (Note that they can 
be anywhere according to your choice.) -->
 
<form id="paystack-card-form">
  <input type="text" data-paystack="number" placeholder="Card Number">
  <input type="text" data-paystack="cvv" placeholder="CVV">
  <input type="text" data-paystack="expiryMonth" placeholder="Expiry Month">
  <input type="text"  data-paystack="expiryYear" placeholder="Expiry Year">
  <button type="submit" data-paystack="submit">Submit</button>
</form>

<!-- if pin is requested, you can pass the PIN to #card_pin from a form -->

<!-- OTP form -->
<form id="otp-form">
  <input type="text" data-paystack="token" placeholder="token">
  <button type="submit" data-paystack="submit">Submit</button>
</form>
```

`#customer-email` is an ID of the input form which will accepts the email of the user or the card owner.

`#amount` is an ID of the input form that accepts the amount to be charged from the card.

`#success-response` is an ID that listens to a text which inform that the transaction was successful.

`#mobile-number` is an ID of the input form that accepts the mobile number of the user.

`#access_code` is the ID of a text that passes the access code which will be programatically generated by you. Please note that the access code can only be used once.

`#card_pin` is the ID of the input form that accepts card PIN.

`#OTP` is the ID of the input form that accepts the OTP sent to phone.

## Author

### Tobi Okedeji