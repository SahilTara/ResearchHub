//
//  ResearchTableViewController.swift
//  ResearchHub
//
//  Created by Danish Dua on 2019-02-10.
//  Copyright © 2019 Danish Dua. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON
import Alamofire_Synchronous

class ResearchTableViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    let CSAPI_RES = "http://research-hub-cs.azurewebsites.net/api/researchPosting/all"
    
    @IBOutlet weak var tableview: UITableView!
    
    var researches = [Research]()

    override func viewDidLoad() {
        super.viewDidLoad()
        tableview.dataSource = self
        tableview.delegate = self
        super.view.addSubview(tableview)
        
        fetch_data()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        fetch_data()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        //
    }
    
    func fetch_data() {
        let photo = UIImage(named: "stock")
        
        guard let researchCall = URL(string: CSAPI_RES) else {
            return
        }
        researches = [Research]()
        
        let response = Alamofire.request(researchCall, method: .get, parameters: nil, encoding: JSONEncoding.default, headers: nil).responseJSON()
        if response.result.value is NSNull {
            return
        }
        let Json = JSON(response.result.value!)
        if let jArray = Json.array {
            for obj in jArray {
                if let name = obj["object"]["projectName"].string,
                    let description = obj["object"]["projectDescription"].string,
                    let author = obj["object"]["author"].string,
                    let organization = obj["object"]["organization"].string {
                    self.researches.append(Research(name: name,
                                                    photo: photo, description: description,
                                                    author: author, organization: organization))
                }
            }
        }
        tableview.reloadData()
    }

    // MARK: - Table view data source

    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return researches.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        let cellIdentifier = "ResearchTableViewCell"
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? ResearchTableViewCell else {
            fatalError("The dequeued cell is not an instance of MealTableViewCell.")
        }
        
        let research = researches[indexPath.row]
        
        cell.researchName.text = research.name
        cell.researchImage.image = research.photo
        cell.researchAuthor.text = research.author
        cell.researchDescription.text = research.description
        cell.researchOrganization.text = research.organization
        
        return cell
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
