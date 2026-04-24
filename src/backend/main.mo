import Text "mo:core/Text";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  // DATA TYPES
  // First-Aid
  type FirstAidCategory = {
    #bleeding;
    #fractures;
    #CPR;
    #burns;
    #shock;
  };

  type FirstAidSeverity = {
    #low;
    #moderate;
    #high;
    #critical;
  };

  type FirstAidArticle = {
    title : Text;
    category : FirstAidCategory;
    content : Text;
    severity : FirstAidSeverity;
    steps : [Text];
  };

  // Survival
  type SurvivalCategory = {
    #water;
    #shelter;
    #fire;
    #navigation;
    #food;
  };

  type SurvivalTopic = {
    title : Text;
    category : SurvivalCategory;
    content : Text;
    tags : [Text];
  };

  // Hazard
  type HazardType = {
    #flood;
    #fire;
    #earthquake;
    #chemical;
  };

  type HazardSeverity = {
    #low;
    #moderate;
    #severe;
    #extreme;
  };

  type HazardRecord = {
    hazardType : HazardType;
    location : Text;
    severity : HazardSeverity;
    timestamp : Time.Time;
  };

  // Triage
  type TriageStatus = {
    #immediate;
    #delayed;
    #minor;
    #deceased;
  };

  type TriageRecord = {
    patientId : Text;
    status : TriageStatus;
    symptoms : [Text];
    notes : Text;
    timestamp : Time.Time;
  };

  // MODULE FOR TriageRecord
  module TriageRecord {
    public func compare(t1 : TriageRecord, t2 : TriageRecord) : Order.Order {
      Text.compare(t1.patientId, t2.patientId);
    };
  };

  // STORAGE
  let firstAidMap = Map.empty<Text, FirstAidArticle>();
  let survivalMap = Map.empty<Text, SurvivalTopic>();
  let hazardMap = Map.empty<Text, HazardRecord>();
  let triageMap = Map.empty<Text, TriageRecord>();

  // FIRST AID FUNCTIONS
  public shared ({ caller }) func addFirstAidArticle(article : FirstAidArticle) : async () {
    firstAidMap.add(article.title, article);
  };

  public query ({ caller }) func getFirstAidArticle(title : Text) : async FirstAidArticle {
    switch (firstAidMap.get(title)) {
      case (null) { Runtime.trap("First aid article not found") };
      case (?article) { article };
    };
  };

  public query ({ caller }) func getAllFirstAidArticles() : async [FirstAidArticle] {
    firstAidMap.values().toArray();
  };

  // SURVIVAL FUNCTIONS
  public shared ({ caller }) func addSurvivalTopic(topic : SurvivalTopic) : async () {
    survivalMap.add(topic.title, topic);
  };

  public query ({ caller }) func getAllSurvivalTopics() : async [SurvivalTopic] {
    survivalMap.values().toArray();
  };

  // HAZARD FUNCTIONS
  public shared ({ caller }) func addHazardRecord(record : HazardRecord) : async () {
    hazardMap.add(record.location, record);
  };

  public query ({ caller }) func getAllHazardRecords() : async [HazardRecord] {
    hazardMap.values().toArray();
  };

  // TRIAGE FUNCTIONS
  public shared ({ caller }) func addTriageRecord(record : TriageRecord) : async () {
    triageMap.add(record.patientId, record);
  };

  public query ({ caller }) func getAllTriageRecords() : async [TriageRecord] {
    triageMap.values().toArray().sort();
  };

  // AI QUERY HANDLER
  public query ({ caller }) func searchArticles(searchTerm : Text) : async { firstAid : [FirstAidArticle]; survival : [SurvivalTopic] } {
    let firstAidResults = List.empty<FirstAidArticle>();
    let survivalResults = List.empty<SurvivalTopic>();

    for (article in firstAidMap.values()) {
      if (article.title.contains(#text searchTerm) or article.content.contains(#text searchTerm)) {
        firstAidResults.add(article);
      };
    };

    for (topic in survivalMap.values()) {
      if (topic.title.contains(#text searchTerm) or topic.content.contains(#text searchTerm)) {
        survivalResults.add(topic);
      };
    };

    {
      firstAid = firstAidResults.toArray();
      survival = survivalResults.toArray();
    };
  };

  // INITIAL SAMPLE DATA
  system func preupgrade() {};
  system func postupgrade() {};

  let sampleFirstAid : [FirstAidArticle] = [
    {
      title = "Treating Bleeding Wounds";
      category = #bleeding;
      content = "Apply pressure to stop bleeding, clean the wound, and cover with a sterile bandage.";
      severity = #moderate;
      steps = ["Apply pressure", "Clean wound", "Bandage"];
    },
    {
      title = "CPR Procedure";
      category = #CPR;
      content = "Perform chest compressions and rescue breaths for cardiac arrest.";
      severity = #critical;
      steps = ["Check responsiveness", "Call for help", "Start compressions", "Give rescue breaths"];
    },
  ];

  let sampleSurvival : [SurvivalTopic] = [
    {
      title = "Finding Clean Water";
      category = #water;
      content = "Look for natural water sources, purify using filters or boiling.";
      tags = ["water", "purification", "survival"];
    },
    {
      title = "Building a Shelter";
      category = #shelter;
      content = "Use branches, leaves, and natural materials to create a shelter.";
      tags = ["shelter", "building", "protection"];
    },
  ];

  let sampleHazards : [HazardRecord] = [
    {
      hazardType = #flood;
      location = "Riverdale";
      severity = #severe;
      timestamp = 1718419154;
    },
    {
      hazardType = #earthquake;
      location = "Seismic City";
      severity = #extreme;
      timestamp = 1718419155;
    },
  ];

  let sampleTriage : [TriageRecord] = [
    {
      patientId = "P123";
      status = #immediate;
      symptoms = ["Severe bleeding", "Unconscious"];
      notes = "Needs urgent care";
      timestamp = 1718419156;
    },
    {
      patientId = "P124";
      status = #minor;
      symptoms = ["Scratches", "Bruises"];
      notes = "Stable condition";
      timestamp = 1718419157;
    },
  ];

  public shared ({ caller }) func initializeData() : async () {
    let firstAidEntries = sampleFirstAid.map(func(article) { (article.title, article) });
    let survivalEntries = sampleSurvival.map(func(topic) { (topic.title, topic) });
    let hazardEntries = sampleHazards.map(func(record) { (record.location, record) });
    let triageEntries = sampleTriage.map(func(record) { (record.patientId, record) });

    // Add all entries explicitly using for loop
    for ((key, value) in firstAidEntries.values()) {
      firstAidMap.add(key, value);
    };
    for ((key, value) in survivalEntries.values()) {
      survivalMap.add(key, value);
    };
    for ((key, value) in hazardEntries.values()) {
      hazardMap.add(key, value);
    };
    for ((key, value) in triageEntries.values()) {
      triageMap.add(key, value);
    };
  };
};
