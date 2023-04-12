import { createElement } from 'lwc';
import Assignment2Parent from 'c/assignment2Parent';
import getAccountList from "@salesforce/apex/accountHelper.getAccountList";
import insertAccount from "@salesforce/apex/accountHelper.insertAccount";
import { getPicklistValues } from "lightning/uiObjectInfoApi";

async function flushPromises() {
    return Promise.resolve();
}

jest.mock(
    "@salesforce/apex/accountHelper.insertAccount",
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

jest.mock(
    "@salesforce/apex/accountHelper.getAccountList",
    () => {
        const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
        return {
            default: createApexTestWireAdapter(jest.fn())
        };
    },
    { virtual: true }
);



describe('c-assignment2-parent', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        // Arrange
        const element = createElement('c-assignment2-parent', {
            is: Assignment2Parent
        });

        // Act
        document.body.appendChild(element);
    });

    const mockIndustryValues = require("./data/mockIndustryValues.json");
    const mockTypeValues = require("./data/mockTypeValues.json");
    const mockAccounts = require("./data/mockAccounts.json");

    it("test child input component", async () => {
        const element = document.body.querySelector("c-assignment2-parent");

        const child = element.shadowRoot.querySelector('c-assignment-2-child');
        const input = child.shadowRoot.querySelector('lightning-input');
        input.value = "Pallav Pushparaj";
        input.dispatchEvent(new CustomEvent("change"));

        getPicklistValues.emit(mockIndustryValues);
        getPicklistValues.emit(mockTypeValues); 

        const button = element.shadowRoot.querySelectorAll('lightning-button');
        insertAccount.mockResolvedValue();

        button[0].click();

        await flushPromises();

        expect(element.accName).toBe("Pallav Pushparaj");
    });

    it("test fetch accounts", async () => {
        const element = document.body.querySelector("c-assignment2-parent");
        const buttons = element.shadowRoot.querySelectorAll("lightning-button");
        const datatable = element.shadowRoot.querySelector("lightning-datatable");
        expect(datatable).toBeNull();
        buttons[1].click();
        await flushPromises();
        expect(datatable).toBeDefined();
    });

    it("test comboxes", async () => {
        const element = document.body.querySelector("c-assignment2-parent");
        const comboboxes = element.shadowRoot.querySelectorAll("lightning-combobox");
        comboboxes[0].value = "Technology Partner";
        comboboxes[0].dispatchEvent(new CustomEvent("change"));

        comboboxes[1].value = "Banking";
        comboboxes[1].dispatchEvent(new CustomEvent("change"));

        await flushPromises();

        expect(element.accountTypeValue).toBe("Technology Partner");
        expect(element.industryValue).toBe("Banking");
    });

    it("test rejected values", async () => {
        const element = document.body.querySelector("c-assignment2-parent");
        insertAccount.mockRejectedValue();
        getAccountList.emit(mockAccounts);
        expect(element).toBeDefined();
    });

    it("test toast event", async () => {
        const element = document.body.querySelector("c-assignment2-parent");

        const handler = jest.fn();
        element.addEventListener("lightning__showtoast", handler);

        const child = element.shadowRoot.querySelector("c-assignment-2-child");
        const inputs = child.shadowRoot.querySelector("lightning-input");
        inputs.value = "Pallav Pushparaj";
        inputs.dispatchEvent(new CustomEvent("change"));
        const save = element.shadowRoot.querySelectorAll("lightning-button");

        const combobox = element.shadowRoot.querySelectorAll("lightning-combobox");
        combobox[0].value = "Technology Partner";
        combobox[0].dispatchEvent(new CustomEvent("change"));

        combobox[1].value = "Banking";
        combobox[1].dispatchEvent(new CustomEvent("change"));

        insertAccount.mockResolvedValue(inputs.value, combobox[0].value, combobox[1].value);

        save[0].click();

        await flushPromises();

        expect(handler).toHaveBeenCalled();
    });
    
});