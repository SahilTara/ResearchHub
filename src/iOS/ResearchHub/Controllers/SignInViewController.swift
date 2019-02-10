//
//  SignInViewController.swift
//  ResearchHub
//
//  Created by Danish Dua on 2019-02-09.
//  Copyright © 2019 Danish Dua. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth
import GoogleSignIn
import Alamofire

class SignInViewController: UIViewController, GIDSignInUIDelegate {
    
    let CSAPI_TYPE = "https://research-hub-cs.azurewebsites.net/api/type/"
    let CSAPI_PROF = "https://research-hub-cs.azurewebsites.net/api/profile/"

    override func viewDidLoad() {
        super.viewDidLoad()
        
        GIDSignIn.sharedInstance().uiDelegate = self
        GIDSignIn.sharedInstance().signIn()
        
        if let user = Auth.auth().currentUser {
            let uid = user.uid
            guard let typeCall = URL(string: CSAPI_TYPE + uid) else {
                return
            }
            Alamofire.request(typeCall).responseString { response in
                var statusCode = response.response?.statusCode
                if statusCode == 400 {
                    let parameters = [
                        "type": "participant"
                    ]
                    Alamofire.request(typeCall, method: .post, parameters: parameters, encoding: JSONEncoding.default, headers: nil).validate()
                        .responseJSON { innerResponse in
                            statusCode = innerResponse.response?.statusCode
                            if statusCode != 200 {
                               //
                            }
                    }
                }
            }
            
            guard let profileCall = URL(string: CSAPI_PROF + uid) else {
                return
            }
            Alamofire.request(profileCall).responseString { response in
                var statusCode = response.response?.statusCode
                if statusCode == 400 {
                    self.performSegue(withIdentifier: "ProfileSegue", sender: nil)
                }
            }
        }
    }

}
