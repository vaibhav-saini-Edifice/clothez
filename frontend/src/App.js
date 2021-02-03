import react from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./components/categories/Categories";
import Store from "./components/store/Store";
import Cart from "./components/cart/Cart";

class App extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            Store: false,
            Gfilter: "",
            details: false,
            detailitem: [],
            cart: false,
            cartitems: [],
        };
    }
    componentDidMount() {
        fetch("http://localhost:4000/db")
            .then((data) => data.json())
            .then((data) => {
                this.setState({ data: data });
                console.log(this.state.data);
            });
    }
    cart = (data, items) => {
        this.setState({
            cart: data,
        });
    };
    cartAddItems = (item) => {
        this.setState((prevstate) => {
            return {
                cartitems: [...prevstate.cartitems, item],
            };
        });
    };
    storeCallback = (data, filter = "") => {
        this.setState({
            Store: data,
            Gfilter: filter,
            details: false,
            detailitem: [],
            cart: false,
        });

        console.log(this.state);
    };
    detailscallback = (dtrue, data) => {
        this.setState({ details: dtrue, detailitem: data, cart: false });
    };
    render() {
        let componenet;
        if (this.state.cart) {
            componenet = <Cart items={this.state.cartitems}></Cart>;
        } else if (this.state.data[0] && !this.state.Store) {
            componenet = (
                <Categories
                    className="Categories"
                    Storecallback={this.storeCallback}
                ></Categories>
            );
        } else if (this.state.Store) {
            componenet = (
                <Store
                    detailitem={this.state.detailitem}
                    details={this.state.details}
                    detailcallback={this.detailscallback}
                    Data={this.state.data}
                    filter={this.state.Gfilter}
                    cartAddItems={this.cartAddItems}
                ></Store>
            );
        } else {
            return <h1>loading</h1>;
        }

        return (
            <div className="App">
                <Navbar
                    storeCallback={this.storeCallback}
                    cartCallback={this.cart}
                ></Navbar>
                {componenet}
                <button
                    onClick={() => {
                        this.storeCallback(true);
                    }}
                >
                    Store
                </button>
            </div>
        );
    }
}

export default App;
