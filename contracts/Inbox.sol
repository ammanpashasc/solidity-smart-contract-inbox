// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.9;

contract Inbox {
    string public message;

    // "memory" is not persistent. It costs lower than "storage", which is persistent
    constructor(string memory _msg) public {
        message = _msg;
    }

    function setMessage(string memory _msg) public {
        message = _msg;
    }
}
