"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "/public/logo.png";
import { MenuItem } from "./MenuItem";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { z } from "zod";

// Modal Component
const MyModal = ({ isOpen, onOpenChange }) => {
  // State for form fields and errors
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    city: "",
    pincode: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (value.trim() !== "") {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form fields
  const validate = () => {
    const schema = z.object({
      name: z.string().min(1, { message: "Field is required." }),
      mobileNumber: z
        .string()
        .min(10, { message: "Must be at least 10 digits." }),
      city: z.string().min(1, { message: "Field is required." }),
      pincode: z.string().min(5, { message: "Must be at least 5 digits." }),
      email: z.string().email({ message: "Invalid email address." }),
    });

    try {
      schema.parse(formData);
      return {};
    } catch (e) {
      return e.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form submitted successfully", formData);
      onOpenChange(false); // Close the modal on success
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={true}
      isKeyboardDismissDisabled={false}
      className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg"
    >
      <form onSubmit={handleSubmit} method="post">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Dealership</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>✕
                </button>
              </ModalHeader>

              <ModalBody className="p-6 space-y-4">
                <p className="text-sm text-gray-700">
                  For a callback, simply fill the form below or call us at{" "}
                  <a href="tel:18003099393" className="text-green-600">
                    1800 309 9393
                  </a>
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 p-2 w-full border rounded`}
                    />
                    {errors.name && (
                      <div className="mt-1 text-xs text-red-500">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="mobileNumber"
                      placeholder="Mobile No."
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className={`mt-1 p-2 w-full border rounded`}
                    />
                    {errors.mobileNumber && (
                      <div className="mt-1 text-xs text-red-500">
                        {errors.mobileNumber}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className={`mt-1 p-2 w-full border rounded`}
                    />
                    {errors.city && (
                      <div className="mt-1 text-xs text-red-500">
                        {errors.city}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`mt-1 p-2 w-full border rounded`}
                    />
                    {errors.pincode && (
                      <div className="mt-1 text-xs text-red-500">
                        {errors.pincode}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded`}
                    required
                  />
                  {errors.email && (
                    <div className="mt-1 text-xs text-red-500">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-4">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I have read and understood the T&C*
                  </label>
                </div>
              </ModalBody>

              <ModalFooter className="p-4 border-t border-gray-200">
                <Button
                  color="success"
                  className="bg-green-600 text-white py-2 px-4 rounded-full"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
};

// Header Component
export default function Header() {
  const { isOpen, setIsOpen } = useState();

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  return (
    <div className="bg-blue-600 flex justify-around items-center px-8 py-4">
      {/* Logo */}
      <Link href="/">
        <Image src={logo} alt="Astral Paints logo" width={120} height={40} />
      </Link>

      {/* Menu Items */}
      <div className="flex space-x-8 text-white font-medium">
        <MenuItem title="About" address="/" />
        <MenuItem title="Category" address="/" />
        <MenuItem title="Services" address="/" />
        <MenuItem title="Colours" address="/" />
        <MenuItem title="Downloads" address="/" />
        <MenuItem title="Become a Dealer" address="/" />
        <MenuItem title="Blogs" address="/" />
        <MenuItem title="Contacts" address="/" />
      </div>

      {/* Button */}
      <Button
        onPress={() => handleOpenChange(true)}
        className="px-6 py-2 bg-white text-blue-600 font-medium rounded-full shadow-md hover:bg-blue-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Enquire Now
      </Button>

      {/* Modal */}
      <MyModal isOpen={isOpen} onOpenChange={handleOpenChange} />
    </div>
  );
}
