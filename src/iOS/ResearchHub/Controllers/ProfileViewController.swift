//
//  ProfileViewController.swift
//  ResearchHub
//
//  Created by Danish Dua on 2019-02-10.
//  Copyright © 2019 Danish Dua. All rights reserved.
//

import UIKit
import Eureka
import Alamofire
import FirebaseAuth

class ProfileViewController: FormViewController {
    
    let CSAPI_PROF = "https://research-hub-cs.azurewebsites.net/api/profile/"

    @IBAction func Update(_ sender: UIBarButtonItem) {
        if let nameRow = self.form.rowBy(tag: FormItems.name) as? RowOf<String>,
            let birthDateRow = self.form.rowBy(tag: FormItems.dateOfBirth) as? RowOf<Date>,
            let demographicRow = self.form.rowBy(tag: FormItems.demograhic) as? RowOf<String>,
            let heightRow = self.form.rowBy(tag: FormItems.height) as? RowOf<Int>,
            let weightRow = self.form.rowBy(tag: FormItems.weight) as? RowOf<Int>,
            let locationRow = self.form.rowBy(tag: FormItems.location) as? RowOf<String> {
            
            do {
                guard let name = nameRow.value else {
                    throw NSError()
                }
                guard let birthDate = birthDateRow.value else {
                    throw NSError()
                }
                guard let demographic = demographicRow.value else {
                    throw NSError()
                }
                guard let height = heightRow.value else {
                    throw NSError()
                }
                guard let weight = weightRow.value else {
                    throw NSError()
                }
                guard let location = locationRow.value else {
                    throw NSError()
                }
                if let user = Auth.auth().currentUser {
                    let uid = user.uid
                    guard let profileCall = URL(string: CSAPI_PROF + uid) else {
                        return
                    }
                    
                    let dateFormatter = DateFormatter()
                    dateFormatter.dateFormat = "MM/dd/yyyy"
                    
                    let parameters = [
                        "name": name,
                        "dateOfBirth": dateFormatter.string(from: birthDate),
                        "demographic": demographic,
                        "height": height,
                        "weight": weight,
                        "location": location
                        ] as [String : Any]
                    
                    Alamofire.request(profileCall, method: .patch, parameters: parameters, encoding: JSONEncoding.default, headers: nil).validate()
                        .responseJSON { response in
                            var statusCode = response.response?.statusCode
                            if statusCode == 200 {
                                let alert = UIAlertView()
                                alert.title = "Success!"
                                alert.message = "Successfully updated your profile!"
                                alert.addButton(withTitle: "Done")
                                alert.show()
                            }
                    }
                }
            } catch let error as NSError {
                showAlert()
                return
            }
        } else {
            showAlert()
        }
    }
    
    func showAlert() {
        let alert = UIAlertView()
        alert.title = "Invalid data format"
        alert.message = "Invalid data format! Please validate your profile"
        alert.addButton(withTitle: "Done")
        alert.show()
    }
    
    struct FormItems {
        static let name = "name"
        static let dateOfBirth = "date"
        static let demograhic = "demographic"
        static let height = "height"
        static let weight = "weight"
        static let location = "location"
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        form +++ Section("Profile")
            <<< TextRow(FormItems.name) { row in
                row.title = "Name"
                row.placeholder = "Full Name"
            }
            <<< DateRow(FormItems.dateOfBirth) { row in
                row.title = "Date of Birth"
                row.value = Date(timeIntervalSinceReferenceDate: 0)
            }
            <<< PushRow<String>(FormItems.demograhic) { row in
                row.title = "Demograhic/Ethnicity"
                row.options = ["Asian", "American Indian", "Black", "Hispanic/Latino", "Native Hawaiian/Pacific Islander", "White"]
            }
            <<< IntRow(FormItems.height) { row in
                row.title = "Height"
                row.placeholder = "150cm"
            }
            <<< IntRow(FormItems.weight) { row in
                row.title = "Weight"
                row.placeholder = "60kg"
            }
            <<< TextRow(FormItems.location) { row in
                row.title = "Location"
                row.placeholder = "Vancouver, BC"
        }
        
        if let user = Auth.auth().currentUser {
            let uid = user.uid
            guard let profileCall = URL(string: CSAPI_PROF + uid) else {
                return
            }
            updateData(uri: profileCall)
        }
    }
    
    func updateData(uri: URL) {
        Alamofire.request(uri).validate()
            .responseJSON { response in
                if response.result.value is NSNull {
                    return
                }
                let JSON = response.result.value as? NSDictionary
                let name = JSON?["name"] as! String
                
                let date = JSON?["dateOfBirth"] as! String
                let dateFormatter = DateFormatter()
                dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
                dateFormatter.locale = Locale(identifier: "en_US_POSIX")
                let dateOfBirth = dateFormatter.date(from:date)
                
                let demographic = JSON?["demographic"] as! String
                let height = JSON?["height"] as! Int
                let weight = JSON?["weight"] as! Int
                let location = JSON?["location"] as! String
                
                if let nameRow = self.form.rowBy(tag: FormItems.name) as? RowOf<String>,
                    let birthDateRow = self.form.rowBy(tag: FormItems.dateOfBirth) as? RowOf<Date>,
                    let demographicRow = self.form.rowBy(tag: FormItems.demograhic) as? RowOf<String>,
                    let heightRow = self.form.rowBy(tag: FormItems.height) as? RowOf<Int>,
                    let weightRow = self.form.rowBy(tag: FormItems.weight) as? RowOf<Int>,
                    let locationRow = self.form.rowBy(tag: FormItems.location) as? RowOf<String> {
                    nameRow.value = name
                    nameRow.reload()
                    birthDateRow.value = dateOfBirth
                    birthDateRow.reload()
                    demographicRow.value = demographic
                    demographicRow.reload()
                    heightRow.value = height
                    heightRow.reload()
                    weightRow.value = weight
                    weightRow.reload()
                    locationRow.value = location
                    locationRow.reload()
                }
        }
    }

}
