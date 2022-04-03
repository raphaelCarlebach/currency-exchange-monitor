window.onload = async () => {
    declareViewEvents()
};

const declareViewEvents = () => {
    let form = document.querySelector("#id_form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let currencySymbol = document.querySelector("#currencySymbol").value;
        let threshold = document.querySelector("#threshold").value;

        const form_data = {
            currencySymbol: currencySymbol,
            threshold: threshold
        };

        console.log("form_data =", form_data)

        // form validation
        if (form_data.currencySymbol != "" && form_data.threshold != "") {

            // post new watched currency
            let url = "http://localhost:4000/watchedcurrency/new"
            fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form_data)
            }).then(res => {
                console.log("Request complete! response:", res);
                if(res.status == 200){
                    // on success
                    alert("Request success")
                } else {
                    //on error
                    alert("Request faild")
                }
            });
        } else {
            alert("validation error")
        }
    })
}