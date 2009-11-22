// command.ClearMemDiskCache.js
//
// ==UserScript==
// @name command.ClearMemDiskCache
// ==UserScript==
//


var classID = Components.classes["@mozilla.org/network/cache-service;1"];
var cacheService = classID.getService(Components.interfaces.nsICacheService);
cacheService.evictEntries(Components.interfaces.nsICache.STORE_IN_MEMORY);
cacheService.evictEntries(Components.interfaces.nsICache.STORE_ON_DISK);

