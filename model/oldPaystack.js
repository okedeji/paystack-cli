module.exports = {
    
    oldPaystackEmbed : `
    function pay(){
        PaystackPop.setup({
            key: 'the-public-key',
            email: $("#customer-email").val(),
            amount: parseInt($("#amount").val())+"00",
            container: 'paystackEmbedContainer',
            callback: function(response){
                $("#success-response").text('success. transaction ref is ' + response.reference)
            },
        });
    }`,

    oldPaystackInline : `
    function payWithPaystack(){
        var handler = PaystackPop.setup({
            key: 'the-public-key',
            email: $("#customer-email").val(),
            amount: parseInt($("#amount").val()) + "00",
            currency: "NGN",
            //  ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            metadata: {
                custom_fields: [
                    {
                        display_name: "Mobile Number",
                        variable_name: "mobile_number",
                        value: $("#mobile-number").val()
                    }
                ]
            },
            callback: function(response){
                $("#success-response").text('success. transaction ref is ' + response.reference)
            },
            onClose: function(){
                console.log('window closed');
            }
        });
        handler.openIframe();
    }`,

    oldPaystack : `
    // Initialize paystack object
    var paystack;
    Paystack.init({
    form: "paystack-card-form", // Form ID
    access_code: $("#access_code").text()   // You should programmatically pass the access code via Ajax or a server variable. Note that the access code can only be used once. 
    }).then(function(returnedObj){
    paystack = returnedObj;
    }).catch(function(error){
    console.log("There was an error loading Paystack", error);
    });

    $("#paystack-card-form").submit(function(e){
        e.preventDefault();

        paystack.card.charge({
        pin: $("#card_pin").val()
        }).then(function(response){
        console.log(response);
        }, function(error){
        console.log(error);
        });
    });

    $("#otp-form").submit(function(e){
        e.preventDefault();
        paystack.card.validateToken({
        token: $("#OTP").val()
        }).then(function(response){
        console.log(response);
        }, function(error){
        console.log(error);
        });
    });`
}