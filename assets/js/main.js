var show;
const rsvp = "no"

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
    document.getElementsByClassName("main")[0].style.transform= "translateY(0px)";
    var q = document.getElementsByClassName("questions")[0]
    if (el.value == "Yes") {
        q.classList.add("yes");
        q.classList.remove("no");
        this.rsvp = "yes";
        
    }
    else {
        q.classList.add("no");
        q.classList.remove("yes");
        this.rsvp = "no";
        //document.getElementsByClassName("questions")[0].classList.toggle("no");
    }
}

async function submit() {

    const url = ('https://us-central1-ash-wedding.cloudfunctions.net:443/api/v1/token/reply');

    console.log(this.rsvp);
    let name = document.getElementById("name").value;
    console.log(name);

    if (name != "") {
        let allergyDescription = document.getElementById("allergies").value;
        console.log(allergyDescription);
        let allergies = "no";

        const negatives = new Set ([
            "no",
            "nope",
            "nah",
            "nawh",
            "no allergies",
            "not allergic"
        ])

        if ( negatives.has(allergyDescription.toLowerCase()) || allergyDescription == "") {
            allergies = "no";
            allergyDescription = "-";
        }
        else {
            allergies = "yes";
        }
        console.log(allergies);

        let songRequest = document.getElementById("song").value ? document.getElementById("song").value : "-" ;
        console.log(songRequest);
        try {
            var button = window.event.target;
            button.innerText = "Submitting..."
            const response = await fetch(url, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },
        
                body: JSON.stringify({
                    name: name,
                    rsvp: this.rsvp,
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
            }, 1500);

        } catch (error) {
            console.error(error.message);
        }

    }

}

