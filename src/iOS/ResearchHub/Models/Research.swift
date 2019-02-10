//
//  Research.swift
//  ResearchHub
//
//  Created by Danish Dua on 2019-02-10.
//  Copyright © 2019 Danish Dua. All rights reserved.
//

import UIKit

class Research {
    var name: String
    var photo: UIImage?
    var description: String
    var author: String
    var organization: String
    
    init(name: String, photo: UIImage?, description: String, author: String, organization: String) {
        self.name = name
        self.photo = photo
        self.description = description
        self.author = author
        self.organization = organization
    }
}
