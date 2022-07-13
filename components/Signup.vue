<template>
    <div class="main">
        <div class="container">
            <form @submit.prevent="handleSubmit" class="sign-up" action="#">
                <input type="text" v-model="name" placeholder="Prénom" required pattern="[A-Za-z' -]+" />
                <input type="text" v-model="last_name" placeholder="Nom de famille" required pattern="[A-Za-z' -]+" />
                <input type="email" v-model="email" placeholder="Email" required />
                <input type="password" v-model="password" placeholder="Password" id="psw" name="psw" @focus="onFocus()"
                    @blur="onBlur()" @keypress.enter="onKeyUp()" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required />
                <i class="fas fa-eye" @click="showPassword()" id="eye"></i>
                <input type="password" v-model="confirm_password" placeholder="Confirm Password" id="pswconfirm" 
                    @focus="onFocus()" @blur="onBlur()" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required />
                <i class="fas fa-eye" @click="showConfirmPassword()" id="eye2"></i>

                <div id="message" class="message">
                    <h3>Password must contain the following:</h3>
                    <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
                    <p id="capital" class="invalid">
                        A <b>capital (uppercase)</b> letter
                    </p>
                    <p id="number" class="invalid">A <b>number</b></p>
                    <p id="length" class="invalid">Minimum <b>8 characters</b></p>
                </div>

                <button>Inscription</button>
                <button @click="$router.push('login')"><i class="fa fa-arrow-left"
                        aria-hidden="true"></i>Connexion</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

let e = true;

export default {
    name: 'Signup',
    props: {
        msg: String,
    },

    // stockage des information de compte
    data() {
        return {
            dataForm: {
                name: null,
                last_name: null,
                email: null,
                password: null,
                confirm_password: null,
            },
            errMsg: null,
        };
    },
    methods: {

        
    // When the user clicks on the password field, show the message box
        onFocus() {
            document.getElementById("message").style.display = "block";
        },

    // When the user clicks outside of the password field, hide the message box
        onBlur() {
            document.getElementById("message").style.display = "none";
        },

    // When the user starts to type something inside the password field
        onKeyUp() {

        let myInput = document.getElementById("psw");
        let letter = document.getElementById("letter");
        let capital = document.getElementById("capital");
        let number = document.getElementById("number");
        let length = document.getElementById("length");

            // Validate lowercase letters
            let lowerCaseLetters = /[a-z]/g;
            if (myInput.value.match(lowerCaseLetters)) {
                letter.classList.remove("invalid");
                letter.classList.add("valid");
            } else {
                letter.classList.remove("valid");
                letter.classList.add("invalid");
            }
            // Validate capital letters
            let upperCaseLetters = /[A-Z]/g;
            if (myInput.value.match(upperCaseLetters)) {
                capital.classList.remove("invalid");
                capital.classList.add("valid");
            } else {
                capital.classList.remove("valid");
                capital.classList.add("invalid");
            }

            // Validate numbers
            let numbers = /[0-9]/g;
            if (myInput.value.match(numbers)) {
                number.classList.remove("invalid");
                number.classList.add("valid");
            } else {
                number.classList.remove("valid");
                number.classList.add("invalid");
            }

            // Validate length
            if (myInput.value.length >= 8) {
                length.classList.remove("invalid");
                length.classList.add("valid");
            } else {
                length.classList.remove("valid");
                length.classList.add("invalid");
            }
        },


        // Affiche le mot de passe en clair
        showPassword() {
            const eye = document.querySelector('#eye');
            if (e) {
                document.querySelector('#psw').setAttribute("type", "text");
                eye.classList.replace("fa-eye", "fa-eye-slash");
                e = false;
            }
            else {
                document.querySelector('#psw').setAttribute("type", "password");
                eye.classList.replace("fa-eye-slash", "fa-eye");
                e = true;
            }
        },

        showConfirmPassword() {
            const eye = document.querySelector('#eye2');
            if (e) {
                document.querySelector('#pswconfirm').setAttribute("type", "text");
                eye.classList.replace("fa-eye", "fa-eye-slash");
                e = false;
            }
            else {
                document.querySelector('#pswconfirm').setAttribute("type", "password");
                eye.classList.replace("fa-eye-slash", "fa-eye");
                e = true;
            }
        },


        // recuperation des informations de compte
        // envoi des information de compte a l'api
        async handleSubmit() {
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/auth/signup',
                    {
                        name: this.name,
                        last_name: this.last_name,
                        email: this.email,
                        password: this.password,
                        confirm_password: this.confirm_password,
                    }
                );
                const log = await axios.post('http://localhost:3000/api/auth/login', {
                    email: this.email,
                    password: this.password,
                });
                localStorage.setItem('token', log.data.token);
                localStorage.setItem('userId', log.data.userId);
                localStorage.setItem('admin', response.data.admin);
                alert('Votre inscription est validé.');
                this.$router.push('actu');
            } catch (error) {
                alert('Merci de vérifier les informations saisies');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
/* The message box is shown when the user clicks on the password field */
.message {
    display: none;
    background: #f1f1f1;
    color: #000;
    position: relative;
    padding: 20px;
    margin-top: 10px;
}

.message p {
    padding: 10px 35px;
    font-size: 15px;
}

/* Add a green text color and a checkmark when the requirements are right */
.valid {
    color: green;
}

.valid:before {
    position: relative;
    left: -35px;
    // content: "&#10004;";
}

/* Add a red text color and an "x" icon when the requirements are wrong */
.invalid {
    color: red;
}

.invalid:before {
    position: relative;
    left: -35px;
    // content: "&#10006;";
}

.main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    width: 350px;
    background-color: #fff;
    // margin: 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow: hidden;
}

form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 5px 10px;

    input {
        background-color: #eee;
        border: none;
        padding: 14px 16px;
        margin: 6px;
        width: 90%;
        border-radius: 6px;
        border-bottom: 1px solid #ddd;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);
        overflow: hidden;
        font-size: 17px;

        &:focus {
            outline: none;
            background-color: #fff;
        }
    }

    button {
        border-radius: 6px;
        border: 1px solid #4e5166;
        background-color: #4e5166;
        color: #fff;
        width: 100%;
        font-size: 17px;
        font-weight: bold;
        padding: 15px 40px;
        margin: 10px;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        transition: transform 0.1s ease-in;

        &:active {
            transform: scale(0.9);
        }

        &:focus {
            outline: none;
        }
    }

    a {
        text-decoration: none;
        color: #d05059;
        font-size: 15px;
    }

    .btn-secondary {
        width: 70%;
        font-size: 15px;
        padding: 15px 30px;
    }

    input:invalid {
        border: 2px dashed red;
    }

    input:valid {
        border: 1px solid black;
    }

    .fa-arrow-left {
        margin-right: 15px;
    }

    #eye{
        margin-left: 300px;
        position: absolute;
    }
    #eye2{
        position:absolute;
        margin: 130px 0 0 300px;
    }
}
</style>
