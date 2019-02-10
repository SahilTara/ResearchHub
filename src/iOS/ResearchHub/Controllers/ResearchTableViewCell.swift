//
//  ResearchTableViewCell.swift
//  ResearchHub
//
//  Created by Danish Dua on 2019-02-10.
//  Copyright © 2019 Danish Dua. All rights reserved.
//

import UIKit

class ResearchTableViewCell: UITableViewCell {

    @IBOutlet weak var researchName: UILabel!
    @IBOutlet weak var researchDescription: UITextView!
    @IBOutlet weak var researchAuthor: UILabel!
    @IBOutlet weak var researchOrganization: UILabel!
    @IBOutlet weak var researchImage: UIImageView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    @IBAction func signUpForResearch(_ sender: UIButton) {
    }
}
