import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { setPageTitle } from '../store/themeConfigSlice';
import { useDispatch } from 'react-redux';

const sampleData = [{
    "name": "Desktop",
    "type": "folder",
    "children": [
        { "name": "Back", "type": "back", "children": [] },
        {
            "name": "Jay",
            "type": "folder",
            "children": [
                {
                    "name": "Back", "type": "back", "children": [
                        { "name": "Back", "type": "back", "children": [] },
                    ]
                },
                {
                    "name": "Laravel Projects", "type": "folder", "children": [
                        { "name": "Back", "type": "back", "children": [] }
                    ]
                },
                {
                    "name": "Node Projects", "type": "folder", "children": [
                        { "name": "Back", "type": "back", "children": [] }
                    ]
                },
                {
                    "name": "Python Projects", "type": "folder", "children": [
                        { "name": "Back", "type": "back", "children": [] }
                    ]
                },
                {
                    "name": "React Projects", "type": "folder", "children": [
                        { "name": "Back", "type": "back", "children": [] }
                    ]
                },
                {
                    "name": "Shopify Themes", "type": "folder", "children": [
                        { "name": "Back", "type": "back", "children": [] }
                    ]
                },
                {
                    "name": "temp", "type": "folder", "children": [
                        { "name": "Back", "type": "back", "children": [] }
                    ]
                }
            ]
        },
        { "name": "Node Projects", "type": "folder", "children": [{ "name": "Back", "type": "back", "children": [] }] },
        { "name": "React Projects", "type": "folder", "children": [{ "name": "Back", "type": "back", "children": [] }] },
        { "name": "index.html", "type": "file" },
        { "name": "snapmint.json", "type": "file" },
        { "name": "test.html", "type": "file" }
    ]
}];

const Item = ({ name, type }) => {
    return (
        <center>
            <div>
                {
                    (type == "back") ? (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-16 text-danger inline ltr:mr-2 rtl:ml-2">
                            <path opacity="0.6" d="M15 2H14C11.1716 2 9.75736 2 8.87868 2.87868C8 3.75736 8 5.17157 8 8V16C8 18.8284 8 20.2426 8.87868 21.1213C9.75736 22 11.1716 22 14 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2Z" fill="currentColor" />
                            <path opacity="0.4" d="M8 8C8 6.46249 8 5.34287 8.14114 4.5H8C5.64298 4.5 4.46447 4.5 3.73223 5.23223C3 5.96447 3 7.14298 3 9.5V14.5C3 16.857 3 18.0355 3.73223 18.7678C4.46447 19.5 5.64298 19.5 8 19.5H8.14114C8 18.6571 8 17.5375 8 16V12.75V11.25V8Z" fill="currentColor" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46967 11.4697C4.17678 11.7626 4.17678 12.2374 4.46967 12.5303L6.46967 14.5303C6.76256 14.8232 7.23744 14.8232 7.53033 14.5303C7.82322 14.2374 7.82322 13.7626 7.53033 13.4697L6.81066 12.75L14 12.75C14.4142 12.75 14.75 12.4142 14.75 12C14.75 11.5858 14.4142 11.25 14 11.25L6.81066 11.25L7.53033 10.5303C7.82322 10.2374 7.82322 9.76256 7.53033 9.46967C7.23744 9.17678 6.76256 9.17678 6.46967 9.46967L4.46967 11.4697Z" fill="currentColor" />
                        </svg>
                    ) : (
                        (type == 'folder') ? (
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2"
                            >
                                <path opacity="0.5" d="M18 10L13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path
                                    d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        ) : (
                            <>
                                {/* File */}
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-16 text-primary inline ltr:mr-2 rtl:ml-2">
                                    <path
                                        d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z"
                                        fill="currentColor"
                                    />
                                    <path opacity="0.5" d="M6 14.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path opacity="0.5" d="M6 18H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path opacity="0.5" d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </>
                        )
                    )
                }
                <br />
                <strong>{name}</strong>
            </div>
        </center >
    );
}

const DragAndDrop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('NAS | Jay Chauhan'));
    });
    const [gridDrag, setGridDrag] = useState(sampleData);
    const [history, setHistory] = useState([]);

    const selectItem = (index) => {
        const selectedItem = gridDrag[index];

        if (selectedItem.type === "folder") {
            setHistory([...history, gridDrag]); // Store the current state before navigating
            setGridDrag(selectedItem.children);
        } else if (selectedItem.type === "back" && history.length > 0) {
            setGridDrag(history[history.length - 1]); // Go back to previous state
            setHistory(history.slice(0, -1)); // Remove last entry from history
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-6">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>NAS - Jay Chauhan</span>
                </li>
            </ul>

            <div className="dragndrop space-y-8">
                <div className="dragndrop space-y-8">
                    <div className="panel">
                        <div className="font-semibold text-lg dark:text-white mb-5">Primary</div>
                        <div id="example11">
                            <ReactSortable list={gridDrag} setList={setGridDrag} animation={200} className="grid grid-cols-2 xs sm:grid-cols-4 md:grid-cols-8 gap-8 place-items-center">
                                {gridDrag.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="w-24 h-24 rounded-md shadow dark:border-dark flex items-center justify-center font-semibold cursor-grab"
                                            onClick={() => selectItem(index)}
                                        >
                                            <Item name={item.name} type={item.type} />
                                        </div>
                                    );
                                })}
                            </ReactSortable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DragAndDrop;
