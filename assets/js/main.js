var show;

function startLoad() {
  show = setTimeout(showPage, 5000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "flex";
}

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            console.log(entry.target)
            entry.target.classList.add("appear")
        }
    })
},{})

const animElements = document.querySelectorAll(".fadein")
animElements.forEach(el => observer.observe(el))

function toggle() {
    var el = window.event.target;
    if (el.value == "Click Here") {
        //document.getElementsByClassName("questions")[0].classList.toggle("toggled");  
        document.getElementsByClassName("main")[0].classList.toggle("toggled");  
        document.getElementsByClassName("questions")[0].classList.toggle("yes");
        el.value = "Yes";    
    }
    else if (el.value == "No") {
        el.value = "Yes";
        document.getElementsByClassName("questions")[0].classList.toggle("yes");
        document.getElementsByClassName("questions")[0].classList.toggle("no");
    }
    else {
        el.value = "No";
        document.getElementsByClassName("questions")[0].classList.toggle("yes");
        document.getElementsByClassName("questions")[0].classList.toggle("no");
    }
}

async function submit() {

    const url = ('https://us-central1-ash-wedding.cloudfunctions.net:443/api/v1/token/reply');

    let rsvp = document.getElementById("button-toggle").value;
    console.log(rsvp);
    let name = document.getElementById("name").value;
    console.log(name);

    if (name != "") {
        let allergyDescription = document.getElementById("allergies").value;
        console.log(allergyDescription);
        let allergies = false;

        const negatives = new Set ([
            "no",
            "nope",
            "nah",
            "nawh",
            "no allergies",
            "not allergic"
        ])

        if ( negatives.has(allergyDescription.toLowerCase()) || allergyDescription == "") {
            allergies = false;
            allergyDescription = "-";
        }
        else {
            allergies = true;
        }
        console.log(allergies);

        let songRequest = document.getElementById("song").value ? document.getElementById("song").value : "-" ;
        console.log(songRequest);
        try {
            const response = await fetch(url, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },
        
                body: JSON.stringify({
                    name: name,
                    rsvp: rsvp,
                    allergies: allergies,
                    allergyDescription: allergyDescription,
                    songRequest: songRequest
                })
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            setTimeout(() => {
                window.location.replace(window.location.href + "thank-you");
            }, 2000);

        } catch (error) {
            console.error(error.message);
        }

    }

}

